/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Card, Table } from 'react-bootstrap'

interface ListRow {
    row : React.ReactNode,
    wrap?: boolean | undefined,
    link?: string | undefined
}

export interface DataRow extends ListRow {
    title: string
}

type ListParams = {
    columns : string[],
    rows : ListRow[][],
    className?: string | undefined,
}

export const InfoTable = ({ rows } : { rows: DataRow[] }) => (
  <>
    {
      rows.map((r) => (
        <div style={{ marginTop: '1em' }} key={r.title}>
          <Card.Subtitle>{r.title}</Card.Subtitle>
          {r.row}
        </div>
      ))
    }
  </>

)

export const DataTable = ({ rows } : { rows: DataRow[] }) => (
  <Table>
    <tbody>
      {
        rows.map((r) => (
          <tr key={r.title}>
            <th style={{ whiteSpace: 'nowrap' }}>{r.title}</th>
            <td>{r.row}</td>
          </tr>
        ))
      }
    </tbody>
  </Table>
)

const ListTable = ({ columns, rows, className } : ListParams) => (
  <Table responsive striped bordered hover className={className}>
    <thead>
      <tr>
        {columns.map((c) => <th key={c}>{c}</th>)}
      </tr>
    </thead>
    <tbody>
      { rows.map((r, ri) => (
        <tr key={ri}>
          {r.map((c, i) => (
            <td
              key={columns[i]}
              style={{
                whiteSpace: c.wrap ? 'normal' : 'nowrap',
              }}
              onClick={() => {
                if (!c.link) return
                window.location.href = c.link
              }}
            >
              {c.row}
            </td>
          ))}
        </tr>
      )) }
    </tbody>
  </Table>
)

ListTable.defaultProps = {
  className: undefined,
}

export default ListTable
