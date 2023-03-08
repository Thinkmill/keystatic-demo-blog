import dateFormatter from '../utils/dateFormatter'
import type { PostProps, ExternalArticleProps } from '../pages'
import readTime from '../utils/readTime'
import Link from 'next/link'
import maybeTruncateTextBlock from '../utils/maybeTruncateTextBlock'
import AvatarList from './AvatarList'

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
  authors,
}: {
  posts: PostOrExternalArticleProps[]
  authors: any
}) {
  if (posts.length === 0) return <h2>There are no posts available</h2>
  console.log(authors)

  return (
    <ul className='grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3 pl-0'>
      {posts.map((post, index) => {
        console.log(post.authors)
        if (post.type === 'externalArticle') {
          return (
            <li
              className='items-stretch list-none rounded pl-0 my-0 external-link'
              key={index}
            >
              <a
                href={post.directLink}
                target='_blank'
                rel='noopener noreferrer'
                className='no-underline hover:text-tm-red-brand group'
              >
                <div className='border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg prose'>
                  {post.coverImage && (
                    <div className='not-prose'>
                      <img
                        src={`/${post.coverImage}`}
                        className='w-full rounded-t-md aspect-video'
                        alt='Cover image'
                      />
                    </div>
                  )}
                  <div className='p-8 border-t-2 border-slate-100'>
                    <p className='text-slate-500 group-hover:text-tm-red-brand mt-0 mb-3 after:content-["_↗"]'>
                      {post.source}
                    </p>
                    <h3 className='mt-0 mb-3 group-hover:text-tm-red-brand'>
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className='my-0'>
                        {maybeTruncateTextBlock(post.summary, 100)}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </li>
          )
        }
        if (post.type === 'post') {
          return (
            <li
              className='items-stretch list-none rounded pl-0 my-0'
              key={index}
            >
              <Link
                href={`${post.slug}`}
                className='no-underline hover:text-tm-red-brand group'
              >
                <div className='border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg prose'>
                  {post.coverImage && (
                    <div className='not-prose'>
                      <img
                        src={`/${post.coverImage}`}
                        className='w-full rounded-t-md aspect-video'
                        alt='Cover image'
                      />
                    </div>
                  )}
                  <div className='p-8 border-t-2  border-slate-100'>
                    {post.publishedDate && (
                      <p className='mt-0 mb-3 text-slate-500'>
                        {dateFormatter(post.publishedDate, 'do MMM yyyy')}
                      </p>
                    )}
                    <h3 className='mt-0 mb-3 group-hover:text-tm-red-brand'>
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className='mb-3 mt-0'>
                        {maybeTruncateTextBlock(post.summary, 100)}
                      </p>
                    )}
                    <div className='flex flex-row gap-1 justify-between items-center'>
                      {/* <AvatarList authors={post.authors} /> */}
                      {post.wordCount && post.wordCount !== 0 ? (
                        <p className='my-0 shrink-0 px-2 py-1 border-2 border-slate-500 group-hover:border-tm-red-brand rounded-md'>
                          {readTime(post.wordCount)}
                        </p>
                      ) : null}
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
