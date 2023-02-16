import Link from 'next/link'

type IsInternalLink = {
  onClick?: never
  href: string
  externalLink: false
}

type IsExternalLink = {
  onClick?: never
  href: string
  externalLink: true
}

type ButtonOrLinkProps = IsInternalLink | IsExternalLink

export type ButtonProps = ButtonOrLinkProps & {
  label: string
}

const buttonClasses =
  'px-4 py-2 bg-tm-red-brand text-white hover:bg-tm-red-light hover:text-tm-red-dark'

const Button = ({ onClick, href, externalLink, label }: ButtonProps) => {
  if (externalLink) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClasses}
      >
        {label}
      </a>
    )
  }
  return (
    <Link className={buttonClasses} href={href}>
      {label}
    </Link>
  )
}

export default Button
