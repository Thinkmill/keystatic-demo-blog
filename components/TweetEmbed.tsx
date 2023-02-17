import React from 'react'

export const TweetEmbed = ({ tweet }: { tweet: string }) => {
  const wrapper = React.useRef<HTMLQuoteElement>(null)
  React.useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    wrapper.current!.appendChild(script)
  }, [])
  console.log('I am here')
  return (
    <div>
      <blockquote ref={wrapper} className='twitter-tweet'>
        <a href={tweet} target='_blank' rel='noopener noreferrer' />
      </blockquote>
    </div>
  )
}
