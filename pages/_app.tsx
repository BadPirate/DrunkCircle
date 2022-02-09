/* eslint-disable react/jsx-props-no-spreading */
import '../styles/styles.css'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'

// eslint-disable-next-line react/jsx-props-no-spreading
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <DefaultSeo
      openGraph={{
        type: 'website',
        locale: 'en_US',
        site_name: 'DrunkCircle',
        url: `${process.env.NEXT_PUBLIC_URL}${useRouter().asPath}`,
        images: [{
          url: `${process.env.NEXT_PUBLIC_URL}/og_dc.png`,
          width: 1200,
          height: 630,
          alt: 'DrunkCircle Banner',
          type: 'image/png',
        }],
      }}
      key="seo"
    />
    <Component {...pageProps} key="component" />
  </SessionProvider>
)

export default App
