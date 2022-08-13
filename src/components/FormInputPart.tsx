/* eslint-disable react/jsx-props-no-spreading */
import { Form, InputGroup } from 'react-bootstrap'
import React from 'react'

export const FormPart = ({
  name, label, children, help,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  help: string | undefined;
}) => (
  <Form.Group controlId={name} className="mb-3">
    <Form.Label>{label}</Form.Label>
    {children}
    {help ? <Form.Text className="text-muted">{help}</Form.Text> : null}
  </Form.Group>
)
export const FormControlPart = ({
  name, label, options,
}: {
  name: string;
  label: string;
  options: { [key: string]: any; };
}) => (
  <Form.Control
    placeholder={label}
    name={name}
    {...options}
  />
)

export const FormInputPart = ({
  name, label, value, help, options, append,
}: {
  name: string
  label: string
  value?: string | null | undefined | number
  options?: { [key: string]: any; }
  help?: string | undefined
  append?: React.ReactNode
}) => {
  const part = (
    <FormControlPart
      label={label}
      name={name}
      options={{
        ...options,
        defaultValue: value,
      }}
    />
  )
  return (
    <FormPart name={name} label={label} help={help}>
      {
        append ? (
          <InputGroup>
            {part}
            {append}
          </InputGroup>
        ) : part
      }
    </FormPart>
  )
}
FormInputPart.defaultProps = {
  help: undefined,
  options: [],
  value: undefined,
  append: undefined,
}
