import { createReader } from 'keystatic/reader'
import { DocumentRenderer } from 'keystatic/renderer'
import config from '../keystatic'

import { format } from 'date-fns'

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
  console.log('post', post)
  console.log('content', content)
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export default function Post({ post }) {
  console.log(post)
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{format(new Date(post.publishedDate), 'do MMM yyyy')}</p>
      <p>{post.authors}</p>
      {post.coverImage && <img src={post.coverImage} alt={'Cover image'} />}
      <DocumentRenderer document={post.content} />
    </div>
  )
}
