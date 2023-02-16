import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import dateFormatter from '../utils/dateFormatter'
import readTime from '../utils/readTime'
import { DocumentRenderer } from 'keystatic/renderer'
import InlineCTA from '../components/InlineCTA'
import Banner from '../components/Banner'
import Divider from '../components/Divider'
import YouTubeEmbed from '../components/YouTubeEmbed'

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
    <div>
      <h1>{post.title}</h1>
      {post.publishedDate && (
        <p>{dateFormatter(post.publishedDate, 'do MMM yyyy')}</p>
      )}
      <p>{post.authors}</p>
      {post.wordCount && readTime(post.wordCount)}
      <DocumentRenderer
        document={post.content}
        componentBlocks={{
          inlineCTA: (props) => (
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
        }}
      />
    </div>
  )
}
