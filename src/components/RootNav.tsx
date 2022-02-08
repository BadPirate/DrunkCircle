import {
  Navbar, Container, Button, Nav,
} from 'react-bootstrap'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'

interface RootNavProps {
  children : React.ReactNode,
  title: string,
  type?: string,
  image?: string,
}

const RootNav = ({
  children, title, type, image,
} : RootNavProps) => {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content={type} />
        { image ? <meta property="og:image" content={image} /> : null }
      </Head>
      <Navbar key="navbar" variant="dark" bg="secondary" style={{ marginBottom: '1em' }}>
        <Container>
          <Navbar.Brand href="/" key="brand" style={{ marginLeft: '1em', textTransform: 'capitalize' }}>
            {`${process.env.NEXT_PUBLIC_APP_NAME} ${process.env.NEXT_PUBLIC_APP_VERSION}`}
          </Navbar.Brand>
          <Navbar.Toggle key="toggle" />
          <Nav key="links" className="me-auto">
            <Nav.Link href="/trail">Trails</Nav.Link>
            <Nav.Link href="/kennel">Kennels</Nav.Link>
          </Nav>
          <Navbar.Text className="ms-auto" key="spacer" />
          { !session?.user
            ? <Button key="login" variant="success" onClick={() => { signIn() }}>Login</Button>
            : [
              <Navbar.Text key="info"><Link href="/hasher">{session?.user.name}</Link></Navbar.Text>,
              <Button key="logout" className="ms-2" variant="danger" onClick={() => { signOut() }}>Logout</Button>,
            ]}
        </Container>
      </Navbar>
      {children}
    </>
  )
}

RootNav.defaultProps = {
  type: 'website',
  image: '/og_dc.png',
}

export default RootNav
