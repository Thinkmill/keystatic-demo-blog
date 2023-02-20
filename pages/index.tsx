import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'
import AllPosts from '../components/AllPosts'
import type {
  ExternalArticleWithTypeProps,
  PostsWithTypeProps,
  PostOrExternalArticleProps,
} from '../components/AllPosts'
import Divider from '../components/Divider'

export type PostProps = InferGetStaticPropsType<
  typeof getStaticProps
>['posts'][number]

export type ExternalArticleProps = InferGetStaticPropsType<
  typeof getStaticProps
>['externalArticles'][number]

async function getHomeData() {
  const reader = createReader('', config)
  const homePage = await reader.singletons.home.read()
  const homePageContent = await (homePage?.content() || [])

  return {
    ...homePage,
    content: homePageContent,
  }
}

async function getPostData() {
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

  return postData
}

async function getExternalArticleData() {
  const reader = createReader('', config)
  const externalArticles = await reader.collections.externalArticles.list()
  const externalArticleData = await Promise.all(
    externalArticles.map(async (slug) => {
      const externalArticle = await reader.collections.externalArticles.read(
        slug
      )

      return {
        ...externalArticle,
      }
    })
  )
  return externalArticleData
}

export async function getStaticProps() {
  const [{ content, ...homePage }, posts, externalArticles] = await Promise.all(
    [getHomeData(), getPostData(), getExternalArticleData()]
  )

  return {
    props: {
      home: {
        ...homePage,
        content,
      },
      posts,
      externalArticles,
    },
  }
}

export default function Home({
  home,
  posts,
  externalArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const PostsWithType = posts.map(
    (post): PostsWithTypeProps => ({ type: 'post', ...post })
  )
  const ExternalArticleWithType = externalArticles.map(
    (article): ExternalArticleWithTypeProps => ({
      type: 'externalArticle',
      ...article,
    })
  )

  const allPosts: PostOrExternalArticleProps[] = [
    ...PostsWithType,
    ...ExternalArticleWithType,
  ]
  const orderedPostFeed = allPosts.sort((a, b) => {
    if (a?.publishedDate && b?.publishedDate) {
      return new Date(a.publishedDate).getTime() <
        new Date(b.publishedDate).getTime()
        ? 1
        : -1
    }

    return 0
  })
  return (
    <div className='px-4 md:px-28'>
      <DocumentRenderer
        document={home.content}
        componentBlocks={{
          divider: (props) => <Divider noIcon={props.noIcon} />,
        }}
      />
      <AllPosts posts={orderedPostFeed} />
    </div>
  )
}
