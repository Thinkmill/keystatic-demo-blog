const Header = () => {
  return (
    <header className='h-8 flex justify-between p-6 mb-8'>
      <a href='/'>Home</a>
      <nav className='items-center space-x-8 min-[820px]:flex'>
        <a href='/about'>About</a>
        <a href='/blog'>Blog</a>
      </nav>
    </header>
  )
}

export default Header
