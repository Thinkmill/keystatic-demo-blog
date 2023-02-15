import { createReader } from 'keystatic/reader'
import config from '../../keystatic'

import BlogPost from '../../components/BlogPost'

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

export default function Post({ post }) {
  return <BlogPost post={post} />
}
