import Image from 'next/image'
import stars from '../assets/icons/stars.svg'

export default function Banner({
  heading,
  bodyText,
  externalLink,
}: {
  heading: string
  bodyText: string
  externalLink?: {
    href: string
    label: string
  }
}) {
  return (
    <div className='p-10 bg-slate-100 rounded flex flex-row items-center'>
      <div className='pr-10'>
        <Image src={stars} aria-hidden='true' alt='stars icon' />
      </div>
      <div className='flex-row'>
        <p className='mt-0 mb-3 font-bold'>{heading}</p>
        <p className='text-base m-0'>
          {bodyText}
          {externalLink && (
            <a
              className='text-tm-red-brand'
              target='_blank'
              rel='noopener noreferrer'
              href={externalLink.href}
            >
              {' '}
              {externalLink.label}
            </a>
          )}
        </p>
      </div>
    </div>
  )
}
