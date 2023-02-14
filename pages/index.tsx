import Link from 'next/link'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { format } from 'date-fns'

export async function getStaticProps() {
  const reader = createReader('', config)
  const postSlugs = await reader.collections.posts.list()
  const postData = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug)
      const content = (await post?.content()) || []
      console.log(post)
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

export default function Index({ posts }) {
  return (
    <>
      <Link className='text-3xl font-bold underline' href='/keystatic'>
        Go to the Keystatic dashboard
      </Link>

      {posts.map((post) => (
        <a href={post.slug} key={post.slug}>
          <img src={post.coverImage} alt='Cover image' />
          <p>
            {format(new Date(post.publishedDate), 'do MMM yyyy')} |{' '}
            {post.authors.map((author) => author)}
          </p>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </a>
      ))}
    </>
  )
}
