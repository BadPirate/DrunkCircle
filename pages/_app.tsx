/* eslint-disable react/jsx-props-no-spreading */
import '../styles/styles.css'
import '../styles/global.css'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'

config.autoAddCss = false

// eslint-disable-next-line react/jsx-props-no-spreading
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const CPT : any = Component
  const url = useRouter().asPath
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_US',
            site_name: 'DrunkCircle',
            url,
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
        <CPT {...pageProps} key="component" />
      </SessionProvider>
    </SSRProvider>
  )
}

export default App
