import '../styles/global.css'
import '../styles/scoped-preflight.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { usePathname } from 'next/navigation'

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname()
  // When we are in the Keystatic UI we don't want app wide components to leak in
  if (pathname && pathname.includes('/keystatic')) {
    return <Component {...pageProps} />
  }

  //When we are not in the Keystatic UI
  return (
    <div className='flex min-h-screen flex-col with-preflight'>
      <Header />
      <main className='max-w-none flex flex-1 flex-col'>
        <div className='flex-1'>
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
