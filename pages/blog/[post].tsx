import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../../keystatic'
import Link from 'next/link'
import dateFormatter from '../../utils/dateFormatter'
import { DocumentRenderer } from 'keystatic/renderer'
import InlineCTA from '../../components/InlineCTA'

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

export async function getStaticProps(context) {
  const slug = context.params.post
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
      <Link href='/blog'>Back to blog</Link>
      <h1>{post.title}</h1>
      <p>{dateFormatter(post.publishedDate, 'do MMM yyyy')}</p>
      <p>{post.authors}</p>
      {post.coverImage && <img src={post.coverImage} alt={'Cover image'} />}
      <DocumentRenderer
        document={post.content}
        componentBlocks={{
          InlineCTA: (props) => (
            <InlineCTA
              title={props.title}
              summary={props.summary}
              linkButton={{
                href: props.linkSlug,
                label: props.linkLabel,
              }}
            />
          ),
        }}
      />
    </div>
  )
}
