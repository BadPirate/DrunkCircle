import { Alert, Container } from 'react-bootstrap'
import RootNav from './RootNav'

type ErrorDetail = { error: Error | string }
const ErrorBanner = ({ error } : ErrorDetail) => (
  <Alert variant="danger">
    {
      typeof error === 'string' ? error
        : error.toString()
    }
  </Alert>
)

export const BodyError = ({ error } : ErrorDetail) => (
  <RootNav>
    <Container>
      <ErrorBanner error={error} />
    </Container>
  </RootNav>
)

export default ErrorBanner
