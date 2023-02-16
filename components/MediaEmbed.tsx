export enum MediaTypesEnum {
  AUDIO = 'audio',
  VIDEO = 'video',
}

export type MediaEmbedProps = {
  mediaType: MediaTypesEnum.VIDEO | MediaTypesEnum.AUDIO
  iframe: React.ReactNode
}

const MediaEmbed = ({ mediaType, iframe }: MediaEmbedProps) => {
  if (mediaType === 'audio') {
    return <div className='[&>iframe]:w-full'>{iframe}</div>
  }
  return (
    <div className='[&>iframe]:aspect-video [&>iframe]:w-full'>{iframe}</div>
  )
}

export default MediaEmbed
