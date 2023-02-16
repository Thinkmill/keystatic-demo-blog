import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../assets/logo.svg'
import { cx } from '../utils/cx'

export const baseClasses =
  'no-underline justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-gray-800 px-0 border-b-2 hover:text-tm-red-brand hover:bg-none bg-none font-medium shrink-0'

export const NavItems = [
  { name: 'Home', slug: '/' },
  { name: 'About', slug: '/about' },
]

const Header = () => {
  const router = useRouter()
  return (
    <header className='h-8 flex justify-between items-center p-8 mb-8 prose max-w-none'>
      <a className='no-underline' href='/'>
        <Image src={Logo} alt='Readmill logo' />
      </a>
      <nav className='flex items-center space-x-8 min-[820px]:flex'>
        {NavItems.map((item) => (
          <a
            key={item.slug}
            className={cx(
              baseClasses,
              router.pathname === item.slug
                ? 'border-tm-red-brand'
                : 'border-transparent'
            )}
            href={item.slug}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
