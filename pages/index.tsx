import Link from 'next/link'

export default function Index() {
  return (
    <>
      <Link className='text-3xl font-bold underline' href='/keystatic'>
        Go to the Keystatic dashboard
      </Link>
    </>
  )
}
