import Link from 'next/link'
import { Container } from 'react-bootstrap'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-secondary text-light py-3 mt-4">
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <span>
          ©
          {' '}
          {year}
          {' '}
          DrunkCircle
        </span>
        <Link href="/license" className="text-decoration-none text-light">
          View License
        </Link>
      </Container>
    </footer>
  )
}

export default Footer
