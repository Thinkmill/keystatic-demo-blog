import { youtubeEmbedId } from '../utils/youtubeEmbedIdGenerator'
const YouTubeEmbed = ({ youtubeLink }: { youtubeLink: string }) => {
  const embedId = youtubeEmbedId(youtubeLink)
  return (
    <div className='[&>iframe]:aspect-video [&>iframe]:w-full'>
      <iframe
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Youtube video player'
      />
    </div>
  )
}

export default YouTubeEmbed
