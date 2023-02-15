import dateFormatter from '../utils/dateFormatter'

const PostCard = ({ post }) => {
  return (
    <a href={`blog/${post.slug}`}>
      <img src={post.coverImage} alt='Cover image' />
      <p>
        {dateFormatter(post.publishedDate, 'do MMM yyyy')} |{' '}
        {post.authors.map((author) => author)}
      </p>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
    </a>
  )
}

export default PostCard
