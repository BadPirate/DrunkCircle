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

export const HasherPicker = ({ addName, initialValue, formName }: {
  addName?: string;
  formName: string;
  initialValue?: PublicHasherInfo[];
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
  const items: PublicHasherInfo[] = data?.hashers ?? []
  const hasherIds = hashers.map((f) => f.id)
  return (
    <Form.Group>
      {
        hashers.length > 0 ? (
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
          setValue(e.target.value)
          setHasher(
            items.find((h) => h.name?.toLowerCase() === e.target.value.toLocaleLowerCase()),
          )
        }}
        onSelect={(v) => {
          const selected = items.find((h) => h.name === v)
          if (!selected) {
            setValue(v)
            return
          }
          setHashers([
            ...hashers,
            selected,
          ])
          setValue('')
          setHasher(undefined)
        }}
      />
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
    </Form.Group>
  )
}

HasherPicker.defaultProps = {
  addName: 'Select',
  initialValue: [],
}

export default HasherPicker
