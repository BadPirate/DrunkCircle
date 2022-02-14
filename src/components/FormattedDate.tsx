import dateFormat from 'dateformat'

export const MobileAlt = ({ mobile, desktop } : {
    mobile: React.ReactNode,
    desktop: React.ReactNode
}) => (
  <>
    <span key="mobile" className="d-none d-sm-block">{mobile}</span>
    <span key="desktop" className="d-block d-sm-none">{desktop}</span>
  </>
)

const FormattedDate = ({ date } : { date: Date | string }) => {
  const weekNow = new Date()
  const d = new Date(date)
  weekNow.setDate(weekNow.getDate() + 14)
  const short = d < weekNow
  return (
    <MobileAlt
      mobile={
        <span key="mobile">{dateFormat(date, short ? 'DDDD' : 'dddd, mmmm dS')}</span>
      }
      desktop={
        <span key="desktop">{dateFormat(date, short ? 'DDDD' : 'm/d')}</span>
      }
    />
  )
}

export default FormattedDate
