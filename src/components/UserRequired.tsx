import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import HasuraProvider from './HasuraProvider'
import RootNav from './RootNav'

const UserRequired = ({ children } : { children : React.ReactNode }) => {
  const { data: session, status } = useSession()
  const needsLogin = (status !== 'loading' && (!session || !session.user))
  useEffect(() => {
    if (needsLogin) signIn()
  }, [needsLogin])
  if (needsLogin) {
    return (
      <RootNav title="Login required">
        <Container>
          <Button variant="waring" onClick={() => signIn()}>Login Required</Button>
        </Container>
      </RootNav>
    )
  }
  return <HasuraProvider>{children}</HasuraProvider>
}

export default UserRequired
