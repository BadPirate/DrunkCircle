/* eslint-disable import/prefer-default-export */
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap'
import { useState } from 'react'
import AutoComplete from 'react-autocomplete'
import ErrorBanner from './ErrorBanner'
import PublicClientHasura from '../graph/PublicClientHasura'
import { LoadSpinner } from './LoadSpinner'
import { liveMutate } from '../func/liveMutate'
import { queryToInt, queryToStrings } from '../func/queryParsing'
import { PublicHasherInfoFragment, useGqlGetHasherNamesQuery } from '../graph/types'

// eslint-disable-next-line no-control-regex
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm
const isValidEmail = (s: string) => emailRegex.test(s)

export const HasherPicker = ({
  addName, initialValue, formName, onSelect, hideHashers, allowMultiple,
}: {
  addName?: string | undefined
  formName?: string
  initialValue?: PublicHasherInfoFragment[]
  hideHashers?: number[]
  allowMultiple?: boolean
  // eslint-disable-next-line no-unused-vars
  onSelect?: (hasher: PublicHasherInfoFragment) => void
}) => {
  const [hashers, setHashers] = useState<PublicHasherInfoFragment[]>(initialValue ?? [])
  const [value, setValue] = useState<string>('')
  const [hasher, setHasher] = useState<PublicHasherInfoFragment | undefined>(undefined)
  const { loading, data, error } = useGqlGetHasherNamesQuery({
    client: PublicClientHasura,
  })
  if (loading) {
    return <LoadSpinner />
  }
  if (error) {
    return <ErrorBanner error={error} />
  }
  const items: PublicHasherInfoFragment[] = data?.hashers.filter(
    (h) => !(hideHashers || []).includes(h.id),
  ) ?? []

  const hasherIds = hashers.map((f) => f.id)
  const isEmail = value.match('@') !== null
  const validHasher = hasher && hashers.map((h) => h.id).includes(hasher.id)
  const validEmail = isEmail && isValidEmail(value)

  const appendHasher = (h: PublicHasherInfoFragment) => {
    if (onSelect) {
      onSelect(h)
    } else {
      setHashers([
        ...hashers,
        h,
      ])
    }
    setValue('')
    setHasher(undefined)
  }

  return (
    <Form.Group style={{ zIndex: 100 }}>
      {
        hashers.length > 0 && allowMultiple ? (
          <>
            { hashers.map((h) => (
              <InputGroup key={h.id}>
                <InputGroup.Text>{h.name}</InputGroup.Text>
                <FormControl name={`${formName}`} value={h.id} type="hidden" />
                <Button
                  variant="danger"
                  onClick={() => {
                    setHashers(hashers!.filter((f) => f.id !== h.id))
                  }}
                >
                  Remove

                </Button>
              </InputGroup>
            ))}
          </>
        ) : null
      }
      <AutoComplete
        items={value.length > 0
          ? items.filter((i) => i.name!.toLowerCase().includes(value.toLowerCase())
          && !hasherIds.includes(i.id))
          : items.filter((i) => !hasherIds.includes(i.id))}
        getItemValue={(i) => i.name}
        inputProps={{
          className: 'form-control',
          placeholder: 'Hash name or Email',
        }}
        renderItem={(item, isHighlighted) => (
          <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        )}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          const s = items.find((h) => h.name?.toLowerCase() === e.target.value.toLocaleLowerCase())
          setHasher(s)
        }}
        onSelect={(v) => {
          const selected = items.find((h) => h.name === v)
          if (!selected) {
            setValue(v)
            return
          }
          appendHasher(selected)
        }}
      />
      {
        addName !== undefined ? (
          <Button
            variant="success"
            onClick={() => {
              if (validEmail) {
                const email = value
                liveMutate(`/api/hasher/from_email?email=${email}`)
                  .then((j) => {
                    if (!j) { throw Error('Unexpected non-JSON response from_email') }
                    const { id } = queryToInt(j)
                    const { name, error: retrieveError } = queryToStrings(j)
                    if (!id) {
                      // eslint-disable-next-line no-alert
                      alert(retrieveError || 'Unable to add / invite')
                      return
                    }
                    const existing = items.find((h) => h.id === id)
                    appendHasher(existing || {
                      __typename: 'hashers',
                      name,
                      id,
                    })
                  })
                return
              }
              if (hasher) {
                appendHasher(hasher)
              }
            }}
            disabled={!validHasher && !validEmail}
          >
            {isEmail ? `${addName} by email` : addName}
          </Button>
        ) : null
      }
    </Form.Group>
  )
}

HasherPicker.defaultProps = {
  addName: undefined,
  formName: 'hasher-picker',
  initialValue: [],
  onSelect: null,
  hideHashers: [],
  allowMultiple: true,
}
