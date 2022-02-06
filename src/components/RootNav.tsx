import {
  Navbar, Container, Button, Nav,
} from 'react-bootstrap'
import { signIn, signOut, useSession } from 'next-auth/react'

const RootNav = ({ children } : {children : React.ReactNode}) => {
  const { data: session } = useSession()
  return (
    <>
      <Navbar key="navbar" variant="dark" bg="secondary" style={{ marginBottom: '1em' }}>
        <Container>
          <Navbar.Brand href="/" style={{ marginLeft: '1em', textTransform: 'capitalize' }}>
            {`${process.env.NEXT_PUBLIC_APP_NAME} ${process.env.NEXT_PUBLIC_APP_VERSION}`}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link href="/trail">Trails</Nav.Link>
          </Nav>
          <Navbar.Text className="ms-auto" />
          { !session?.user
            ? <Button variant="success" onClick={() => { signIn() }}>Login</Button>
            : [
              <Navbar.Text><a href="/hasher">{session?.user.name}</a></Navbar.Text>,
              <Button className="ms-2" variant="danger" onClick={() => { signOut() }}>Logout</Button>,
            ]}
        </Container>
      </Navbar>
      {children}
    </>
  )
}

export default RootNav
