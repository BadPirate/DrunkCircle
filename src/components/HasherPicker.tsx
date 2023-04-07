/* eslint-disable import/prefer-default-export */
import {
  Button, Form, FormControl, InputGroup, ListGroup, ListGroupItem,
} from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
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

  // const hasherIds = hashers.map((f) => f.id)
  const isEmail = value.match('@') !== null
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

  const suggestions = value.length > 0
    ? items.filter((v) => v.name?.toLowerCase().includes(value.toLowerCase())).slice(0, 5) : []
  const showHints = suggestions.length > 0

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
      {
        showHints ? (
          <ListGroup>
            {
              suggestions.map((h) => (
                <ListGroupItem
                  action
                  onClick={() => {
                    appendHasher(h)
                    setValue('')
                  }}
                >
                  {h.name}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        ) : null
      }
      <InputGroup>
        <FormControl
          type="input"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        {
          value.length > 0 ? (
            <Button onClick={() => {
              setValue('')
              setHasher(undefined)
            }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </Button>
          ) : null
        }
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
              disabled={!hasher && !validEmail}
            >
              {addName}
              {
                isEmail
                  ? <FontAwesomeIcon icon={faPaperPlane} className="ms-1" /> : null
              }
            </Button>
          ) : null
        }
      </InputGroup>
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
