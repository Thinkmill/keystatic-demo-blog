import dateFormatter from '../utils/dateFormatter'
import type { PostType } from '../pages'

export default function AllPosts({ posts }: { posts: PostType[] }) {
  if (posts.length === 0) <h2>There are no posts available</h2>
  return (
    <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
      {posts.map((post) => (
        <li className='items-stretch list-none' key={post.slug}>
          <a
            href={`${post.slug}`}
            className='no-underline hover:text-tm-red-brand'
          >
            {post.coverImage && <img src={post.coverImage} alt='Cover image' />}
            <p>{dateFormatter(post.publishedDate, 'do MMM yyyy')}</p>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <p>{post.authors && post.authors.map((author) => author)}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}
