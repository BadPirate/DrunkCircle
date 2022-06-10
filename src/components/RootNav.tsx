import {
  Navbar, Container, Button, Nav, Dropdown,
} from 'react-bootstrap'
import {
  signIn, signOut, useSession,
} from 'next-auth/react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import BrandImage from '../../public/banner_svg.svg'

export interface RootNavProps {
  children : React.ReactNode,
  title: string,
  type?: string,
  image?: string | undefined,
  description?: string | undefined,
  imageSize?: {
    width: number,
    height: number
  }
}

const RootNav = ({
  children, title, type, image, description, imageSize,
} : RootNavProps) => {
  const { data: session } = useSession()
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          type,
          description,
          images: image ? [{
            url: image,
            ...imageSize,
            alt: title,
            type: 'image/png',
          }] : undefined,
        }}
      />
      <Head>
        <title key="title">{title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="ati" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="32ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="16ico" />
        <link rel="manifest" href="/site.webmanifest" key="manifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" key="maskpin" />
        <meta name="msapplication-TileColor" content="#12B328" key="tilecolor" />
        <meta name="theme-color" content="#12B328" key="theme" />
      </Head>
      <Navbar key="navbar" variant="dark" bg="secondary" style={{ marginBottom: '1em' }}>
        <Container>
          <Navbar.Brand href="/" key="brand" style={{ marginLeft: '1em', textTransform: 'capitalize' }}>
            <BrandImage height="45px" width="85px" alt={process.env.NEXT_PUBLIC_APP_VERSION} />
          </Navbar.Brand>
          <Navbar.Toggle key="toggle" />
          <Nav key="links" className="me-auto">
            <Nav.Link href="/trail">Trails</Nav.Link>
            <Nav.Link href="/kennel">Kennels</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link>
          </Nav>
          <Navbar.Text className="ms-auto" key="spacer" />
          { !session?.user
            ? (
              <Button key="login" variant="warning" onClick={() => { signIn() }}>
                <FontAwesomeIcon icon={faUserSlash} height={20} />
              </Button>
            )
            : (
              <Dropdown drop="start">
                <Dropdown.Toggle variant="success">
                  <FontAwesomeIcon icon={faUserCheck} height={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/hasher">{session.user.name || `Just ${session.user.email}`}</Dropdown.Item>
                  <Dropdown.Item style={{ color: 'red' }} onClick={() => { signOut() }}>Signout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </Container>
      </Navbar>
      {children}
    </>
  )
}

RootNav.defaultProps = {
  type: 'website',
  image: undefined,
  description: undefined,
  imageSize: {
    width: 1200,
    height: 630,
  },
}

export default RootNav
