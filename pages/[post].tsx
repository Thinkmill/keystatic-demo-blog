import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { createReader } from '@keystatic/core/reader'
import config from '../keystatic'
import dateFormatter from '../utils/dateFormatter'
import readTime from '../utils/readTime'
import { DocumentRenderer } from '@keystatic/core/renderer'
import InlineCTA from '../components/InlineCTA'
import Banner from '../components/Banner'
import Divider from '../components/Divider'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { TweetEmbed } from '../components/TweetEmbed'
import LoopingVideo from '../components/LoopingVideo'
import Image from '../components/Image'
import Testimonial from '../components/Testimonial'

export async function getStaticPaths() {
  const reader = createReader('', config)
  // Get collection of all posts
  const postSlugs = await reader.collections.posts.list()
  return {
    // Generate paths for each post
    paths: postSlugs.map((slug) => ({
      params: { post: slug },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.post

  if (typeof slug !== 'string') {
    throw new Error('What? WHYYYY')
  }

  const reader = createReader('', config)
  // Get data for post matching current slug
  const post = await reader.collections.posts.read(slug)
  // Get async data from 'content'
  const content = await (post?.content() || [])
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='max-w-4xl mx-auto px-4 md:px-10 prose'>
      <div className='flex justify-between mt-0 mb-9'>
        <span className='flex gap-1'>
          {post.authors &&
            post.authors &&
            post.authors.map((author, index) => (
              <p className='my-0' key={index}>
                {author}
              </p>
            ))}
        </span>
        <span className='flex gap-1'>
          {post.publishedDate && (
            <p className='my-0'>
              {dateFormatter(post.publishedDate, 'do MMM yyyy')}
            </p>
          )}
          {post.wordCount && post.wordCount !== 0 ? (
            <p className='my-0'>· {readTime(post.wordCount)}</p>
          ) : null}
        </span>
      </div>
      <h1>{post.title}</h1>
      <p className='text-lg'>{post.summary}</p>
      {post.coverImage && (
        <div className='not-prose mb-10'>
          <img
            src={`/${post.coverImage}`}
            className='w-full rounded-md'
            alt='Cover image'
          />
        </div>
      )}
      <DocumentRenderer
        document={post.content}
        componentBlocks={{
          inlineCta: (props) => (
            <InlineCTA
              title={props.title}
              summary={props.summary}
              linkButton={{
                externalLink: props.externalLink,
                href: props.linkSlug,
                label: props.linkLabel,
              }}
            />
          ),
          divider: (props) => <Divider noIcon={props.noIcon} />,
          banner: (props) => (
            <Banner
              heading={props.heading}
              bodyText={props.bodyText}
              externalLink={{
                href: props.externalLinkHref,
                label: props.externalLinkLabel,
              }}
            />
          ),
          youtubeEmbed: (props) => (
            <YouTubeEmbed youtubeLink={props.youtubeLink} />
          ),
          tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
          loopingVideo: (props) => (
            <LoopingVideo src={props.src} caption={props.caption} />
          ),
          image: (props) => (
            <Image src={props.src} alt={props.alt} caption={props.caption} />
          ),
          testimonial: (props) => (
            <Testimonial
              quote={props.quote}
              author={props.author}
              workplaceOrSocial={props.workplaceOrSocial}
              socialLink={props.socialLink}
            />
          ),
        }}
      />
    </div>
  )
}
