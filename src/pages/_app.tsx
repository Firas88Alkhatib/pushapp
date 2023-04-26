import '@/styles/globals.css'
import type { AppProps } from 'next/app'

;(global as any).subscribtions = []

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
