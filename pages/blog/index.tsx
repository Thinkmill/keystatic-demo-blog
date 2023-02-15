import type { InferGetStaticPropsType } from 'next'
import PostCard from '../../components/PostCard'
import { createReader } from 'keystatic/reader'
import config from '../../keystatic'

export async function getStaticProps() {
  const reader = createReader('', config)
  const postSlugs = await reader.collections.posts.list()
  const postData = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug)
      const content = (await post?.content()) || []
      return {
        ...post,
        content,
      }
    })
  )
  if (postSlugs.length === 0) {
    console.log('There are no posts here')
  }

  return {
    props: {
      posts: postData,
    },
  }
}

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (posts.length === 0) <h2>There are no posts available</h2>
  return (
    <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
      {posts.map((post) => (
        <li className='items-stretch' key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
