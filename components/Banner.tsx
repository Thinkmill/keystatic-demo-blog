export default function Banner({
  bodyText,
  url,
}: {
  bodyText: string
  url?: string
}) {
  return (
    <div className='p-4 bg-slate-500 rounded'>
      <p>{bodyText}</p>
      {url && <a href={url}>Check it out</a>}
    </div>
  )
}
