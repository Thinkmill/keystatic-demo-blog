import Link from 'next/link'
import dateFormatter from '../utils/dateFormatter'
import { DocumentRenderer } from 'keystatic/renderer'

const BlogPost = ({ post }) => {
  return (
    <div>
      <Link href='/blog'>Back to blog</Link>
      <h1>{post.title}</h1>
      <p>{dateFormatter(post.publishedDate, 'do MMM yyyy')}</p>
      <p>{post.authors}</p>
      {post.coverImage && <img src={post.coverImage} alt={'Cover image'} />}
      <DocumentRenderer document={post.content} />
    </div>
  )
}

export default BlogPost
