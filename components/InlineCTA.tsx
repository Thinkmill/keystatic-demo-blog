export default function InlineCTA(
  title: string,
  summary: string,
  linkButton: { href: string; label?: string },
  image?: { src: string; alt: string }
) {
  return (
    <div className=''>
      <section>
        <p>{title}</p>
        <p>{summary}</p>
        <a target='_blank' rel='noopener noreferrer' href={linkButton.href}>
          {linkButton.label} || 'Check it out'
        </a>
      </section>
      {image && <img src={image.src} alt={image.alt} />}
    </div>
  )
}
