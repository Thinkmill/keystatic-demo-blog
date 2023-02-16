import Button from './Button'

type InlineCTAProps = {
  title: string
  summary: string
  linkButton: { href: string; label: string; externalLink: boolean }
  image?: { src: string; alt: string }
}

const InlineCTA = (props: InlineCTAProps) => {
  return (
    <div className='grid grid-cols-3'>
      <section className='p-6 grid'>
        <p>{props.title}</p>
        <p>{props.summary}</p>
        <Button
          externalLink={props.linkButton.externalLink}
          href={props.linkButton.href}
          label={props.linkButton.label}
        />
      </section>
      {props.image && <img src={props.image.src} alt={props.image.alt} />}
    </div>
  )
}

export default InlineCTA
