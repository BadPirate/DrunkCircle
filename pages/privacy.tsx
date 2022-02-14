import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import RootNav from '../src/components/RootNav'

export const PrivacyPage = () => (
  <RootNav title="DrunkCircle Privacy">
    <Container>
      <ReactMarkdown>
        {`
# Drunk Circle Privacy Golden Rule

Drunk circle exists soley to connect hashers with trails.  We collect only the bare minimum of information
to perform this service, and do not sell it or use your personal information.  If you 
have any concerns with this policy, contact [Nothing Interesting](mailto:ni@fhacu.com)
            `}
      </ReactMarkdown>
    </Container>
  </RootNav>
)

export default PrivacyPage
