import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../assets/logo.svg'
import { cx } from '../utils/cx'
import React from 'react'

export const baseClasses =
  'no-underline justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-gray-800 px-0 hover:text-tm-red-brand hover:bg-none bg-none font-medium shrink-0'

export const NavItems = [
  {
    name: 'Home',
    slug: '/',
    description:
      'A collection of readings crafted by the talended folks at Thinkmill.',
  },
  {
    name: 'About',
    slug: '/about',
    description: 'Readmill is a simple blog template for Keystatic.',
  },
]

const Header = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const MobileMenu = () => {
    return (
      <div className='mx-4 -mt-1 p-4 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-w-md float-right'>
        {/* Nav items */}
        <div className='grid grid-flow-row not-prose'>
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={
                'pb-5 first:pt-3 px-3 last:pb-3 pt-5 border-b-2 border-slate-100 border-spacing-2 last:border-b-0 no-underline'
              }
              href={item.slug}
            >
              <p
                className={cx(
                  router.pathname === item.slug ? 'text-tm-red-brand' : '',
                  'my-0 pb-2 font-bold'
                )}
              >
                {item.name}
              </p>
              <p className='my-0'>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <header className='prose max-w-none border-b-2 md:border-b-0 border-slate-100 mb-10'>
      <div className='flex justify-between items-center px-4 md:px-28 py-4 md:py-10 h-full'>
        <a className='no-underline' href='/' aria-label='Link to home page'>
          <Image className='my-0' src={Logo} alt='Readmill logo' />
        </a>
        {/* Mobile Hamburger Icon button */}
        <nav className='-mr-2 min-[900px]:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none'
            aria-label='Open menu'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className='h-6 w-6 stroke-gray-900'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            ) : (
              <svg
                className='h-6 w-6 stroke-gray-900'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
                focusable='false'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                ></path>
              </svg>
            )}
          </button>
        </nav>
        {/* Desktop nav */}
        <nav className='items-center space-x-8 hidden min-[900px]:flex'>
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={cx(
                baseClasses,
                router.pathname === item.slug
                  ? 'border-tm-red-brand border-b-2'
                  : 'border-transparent'
              )}
              href={item.slug}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      {menuOpen ? <MobileMenu /> : null}
    </header>
  )
}

export default Header
