import dateFormatter from '../utils/dateFormatter'
import type { PostProps, ExternalArticleProps } from '../pages'
import readTime from '../utils/readTime'
import Link from 'next/link'

export type PostsWithTypeProps = PostProps & {
  type: 'post'
}
export type ExternalArticleWithTypeProps = ExternalArticleProps & {
  type: 'externalArticle'
}

export type PostOrExternalArticleProps =
  | PostsWithTypeProps
  | ExternalArticleWithTypeProps

export default function AllPosts({
  posts,
}: {
  posts: PostOrExternalArticleProps[]
}) {
  if (posts.length === 0) <h2>There are no posts available</h2>

  return (
    <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
      {posts.map((post, index) => {
        if (post.type === 'externalArticle') {
          return (
            <li className='items-stretch list-none rounded' key={index}>
              <a
                href={post.directLink}
                target='_blank'
                rel='noopener noreferrer'
                className='no-underline hover:text-tm-red-brand group'
              >
                <div className='border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg'>
                  {post.coverImage && (
                    <div className='not-prose'>
                      <img
                        src={`/${post.coverImage}`}
                        className='w-full rounded-t-md'
                        alt='Cover image'
                      />
                    </div>
                  )}
                  <div className='p-8 border-t-2 border-slate-100'>
                    <p className='text-slate-500 group-hover:text-tm-red-brand mb-3 after:content-["_↗"]'>
                      {post.source}
                    </p>
                    <h3 className='mt-0 mb-3 group-hover:text-tm-red-brand'>
                      {post.title}
                    </h3>
                    <p className='my-0'>{post.summary}</p>
                  </div>
                </div>
              </a>
            </li>
          )
        }
        if (post.type === 'post') {
          return (
            <li className='items-stretch list-none rounded' key={index}>
              <Link
                href={`${post.slug}`}
                className='no-underline hover:text-tm-red-brand group'
              >
                <div className='border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg '>
                  {post.coverImage && (
                    <div className='not-prose'>
                      <img
                        src={`/${post.coverImage}`}
                        className='w-full rounded-t-md'
                        alt='Cover image'
                      />
                    </div>
                  )}
                  <div className='p-8 border-t-2 border-slate-100'>
                    {post.publishedDate && (
                      <p className='mb-3'>
                        {dateFormatter(post.publishedDate, 'do MMM yyyy')}
                      </p>
                    )}
                    <h3 className='mb-3 group-hover:text-tm-red-brand'>
                      {post.title}
                    </h3>
                    <p className='mb-3'>{post.summary}</p>
                    <div className='flex justify-between items-center'>
                      {post.authors &&
                        post.authors.map((author, index) => (
                          <p key={index}>{author}</p>
                        ))}
                      {post.wordCount && (
                        <p className='px-2 py-1 border-2 border-slate-500 group-hover:border-tm-red-brand rounded-md'>
                          {readTime(post.wordCount)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        }
      })}
    </ul>
  )
}
