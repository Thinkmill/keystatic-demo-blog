import Button from './Button'

type InlineCTAProps = {
  title: string
  summary: string
  linkButton: { href: string; label: string; externalLink: boolean }
}

const InlineCTA = (props: InlineCTAProps) => {
  return (
    <div className='grid grid-cols-3 max-w-3xl mx-auto rounded-xl border-slate-300 border-2'>
      <section className='p-8 col-span-2'>
        <p className='text-xl mb-2'>{props.title}</p>
        <p className='mb-8'>{props.summary}</p>
        <Button
          externalLink={props.linkButton.externalLink}
          href={props.linkButton.href}
          label={props.linkButton.label}
        />
      </section>
      <div className='col-span-1 not-prose flex'>
        <img
          className=''
          src='/thinkmill-cover.png'
          alt='Thinkmill logo on a red background'
        />
      </div>
    </div>
  )
}

export default InlineCTA
