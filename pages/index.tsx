import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'
import AllPosts from '../components/AllPosts'
import Divider from '../components/Divider'

export type PostType = InferGetStaticPropsType<
  typeof getStaticProps
>['posts'][number]

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

export async function getStaticProps() {
  const [{ content, ...homePage }, posts] = await Promise.all([
    getHomeData(),
    getPostData(),
  ])

  return {
    props: {
      home: {
        ...homePage,
        content,
      },
      posts,
    },
  }
}

export default function Home({
  home,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <DocumentRenderer
        document={home.content}
        componentBlocks={{
          divider: (props) => <Divider noIcon={props.noIcon} />,
        }}
      />
      <AllPosts posts={posts} />
    </>
  )
}
