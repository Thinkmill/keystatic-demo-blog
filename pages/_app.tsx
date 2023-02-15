import '../styles/global.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // When we are in the Keystatic UI we don't want app wide components to leak in
  if (router.pathname.includes('/keystatic')) {
    return <Component {...pageProps} />
  }

  //When we are not in the Keystatic UI
  return (
    <>
      <Header />
      <div className='px-6 prose max-w-none'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
