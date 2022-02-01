import { Alert } from 'react-bootstrap'

const ErrorBanner = ({ error } : { error: Error | string }) => (
  <Alert variant="danger">
    {
      typeof error === 'string' ? error
        : error.toString()
    }
  </Alert>
)

export default ErrorBanner
