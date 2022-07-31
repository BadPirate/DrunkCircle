/* eslint-disable import/prefer-default-export */
import { Form } from 'react-bootstrap'
import DateTimeField from 'react-datetime'
import React, { useState } from 'react'

export const InputDate = ({ name, initialValue }: {
  name: string;
  initialValue: Date;
}) => {
  const [value, setValue] = useState(new Date(initialValue))
  if (typeof value.toISOString !== 'function') return <div />
  return (
    <>
      <Form.Control type="hidden" name={name} defaultValue={value.toISOString()} />
      <DateTimeField initialValue={initialValue} onChange={(m) => setValue(typeof m === 'string' ? new Date(m) : m.toDate())} />
    </>
  )
}
