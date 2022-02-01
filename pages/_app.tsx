/* eslint-disable react/jsx-props-no-spreading */
import '../styles/styles.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import HasuraProvider from '../src/components/HasuraProvider'

// eslint-disable-next-line react/jsx-props-no-spreading
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <HasuraProvider>
      <Component {...pageProps} />
    </HasuraProvider>
  </SessionProvider>
)

export default App
