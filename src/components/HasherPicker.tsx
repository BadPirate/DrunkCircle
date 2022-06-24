import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import AutoComplete from 'react-autocomplete'
import ErrorBanner from './ErrorBanner'
import { GQLGetHasherNames, PublicHasherInfo } from '../graph/types'
import PublicClientHasura from '../graph/PublicClientHasura'
import LoadSpinner from './LoadSpinner'

export const GQL_PUBLIC_HASHER_INFO = gql`
fragment PublicHasherInfo on hashers {
  name
  id
}
`

export const HasherPicker = ({
  addName, initialValue, formName, onSelect, hideHashers, allowMultiple,
}: {
  addName?: string | undefined
  formName?: string
  initialValue?: PublicHasherInfo[]
  hideHashers?: number[]
  allowMultiple?: boolean
  // eslint-disable-next-line no-unused-vars
  onSelect?: (hasher: PublicHasherInfo) => void
}) => {
  const [hashers, setHashers] = useState<PublicHasherInfo[]>(initialValue ?? [])
  const [value, setValue] = useState<string>('')
  const [hasher, setHasher] = useState<PublicHasherInfo | undefined>(undefined)
  const { loading, data, error } = useQuery<GQLGetHasherNames>(gql`
${GQL_PUBLIC_HASHER_INFO}
query GQLGetHasherNames {
  hashers(where: {name: {_is_null: false}}, order_by: {name: asc}) {
    ...PublicHasherInfo
  }
}
  `, {
    client: PublicClientHasura,
  })
  if (loading) {
    return <LoadSpinner />
  }
  if (error) {
    return <ErrorBanner error={error} />
  }
  const items: PublicHasherInfo[] = data?.hashers.filter(
    (h) => !(hideHashers || []).includes(h.id),
  ) ?? []
  const hasherIds = hashers.map((f) => f.id)
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
        }}
        renderItem={(item, isHighlighted) => (
          <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        )}
        value={value}
        onChange={(e) => {
          const s = items.find((h) => h.name?.toLowerCase() === e.target.value.toLocaleLowerCase())
          setValue(e.target.value)
          if (onSelect && s) {
            onSelect(s)
          }
          setHasher(s)
        }}
        onSelect={(v) => {
          const selected = items.find((h) => h.name === v)
          if (!selected) {
            setValue(v)
            return
          }
          if (onSelect && selected) {
            onSelect(selected)
          }
          setHashers([
            ...hashers,
            selected,
          ])
          setValue('')
          setHasher(undefined)
        }}
      />
      {
        addName !== undefined ? (
          <Button
            variant="success"
            onClick={() => {
              setHashers([
                ...hashers,
            hasher!,
              ])
              setValue('')
              setHasher(undefined)
            }}
            disabled={!hasher || hashers.map((h) => h.id).includes(hasher.id)}
          >
            {addName}
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
