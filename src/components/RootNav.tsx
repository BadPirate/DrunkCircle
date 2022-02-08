import {
  Navbar, Container, Button, Nav,
} from 'react-bootstrap'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

interface RootNavProps {
  children : React.ReactNode,
  title: string,
  type?: string,
  image?: string,
  description?: string | undefined,
}

const RootNav = ({
  children, title, type, image, description,
} : RootNavProps) => {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="ati" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="32ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="16ico" />
        <link rel="manifest" href="/site.webmanifest" key="manifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" key="maskpin" />
        <meta name="msapplication-TileColor" content="#12B328" key="tilecolor" />
        <meta name="theme-color" content="#12B328" key="theme" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:type" content={type} key="ogtype" />
        { description ? <meta property="og:description" content={description} key="ogdesc" /> : null}
        <meta property="og:image" content={image} key="ogimage" />
      </Head>
      <Navbar key="navbar" variant="dark" bg="secondary" style={{ marginBottom: '1em' }}>
        <Container>
          <Navbar.Brand href="/" key="brand" style={{ marginLeft: '1em', textTransform: 'capitalize' }}>
            <Image height="45px" width="85px" src="/brand.png" alt={process.env.NEXT_PUBLIC_APP_VERSION} />
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
  description: undefined,
}

export default RootNav
