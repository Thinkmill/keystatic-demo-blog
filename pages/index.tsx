import type { InferGetStaticPropsType } from 'next'
import { createReader } from '@keystatic/core/reader'
import config from '../keystatic.config'
import AllPosts from '../components/AllPosts'
import type {
  ExternalArticleWithTypeProps,
  PostsWithTypeProps,
  PostOrExternalArticleProps,
} from '../components/AllPosts'
import { DocumentRenderer } from '@keystatic/core/renderer'

import Banner from '../components/Banner'
import InlineCTA from '../components/InlineCTA'
import Divider from '../components/Divider'
import YouTubeEmbed from '../components/YouTubeEmbed'
import TweetEmbed from '../components/TweetEmbed'
import LoopingVideo from '../components/LoopingVideo'
import Image from '../components/Image'
import Testimonial from '../components/Testimonial'

export type PostProps = InferGetStaticPropsType<
  typeof getStaticProps
>['posts'][number]

export type AuthorProps = InferGetStaticPropsType<
  typeof getStaticProps
>['authors'][number]

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
        slug,
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

async function getAllAuthors() {
  const reader = createReader('', config)
  const authorsList = await reader.collections.authors.list()
  const allAuthors = await Promise.all(
    authorsList.map(async (slug) => {
      return { ...(await reader.collections.authors.read(slug)) }
    })
  )

  return allAuthors
}

export async function getStaticProps() {
  const [{ content, ...homePage }, posts, externalArticles, authors] =
    await Promise.all([
      getHomeData(),
      getPostData(),
      getExternalArticleData(),
      getAllAuthors(),
    ])

  console.log(authors)

  return {
    props: {
      home: {
        ...homePage,
        content,
      },
      posts,
      externalArticles,
      authors,
    },
  }
}

export default function Home({
  home,
  posts,
  externalArticles,
  authors,
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
    <div className='px-4 md:px-28 max-w-7xl mx-auto'>
      <div className='prose max-w-none'>
        <DocumentRenderer
          document={home.content}
          componentBlocks={{
            inlineCta: (props) => (
              <InlineCTA
                title={props.title}
                summary={props.summary}
                linkButton={{
                  externalLink: props.externalLink,
                  href: props.href,
                  label: props.linkLabel,
                }}
              />
            ),
            divider: (props) => <Divider noIcon={props.noIcon} />,
            banner: (props) => (
              <Banner
                heading={props.heading}
                bodyText={props.bodyText}
                externalLink={{
                  href: props.externalLinkHref,
                  label: props.externalLinkLabel,
                }}
              />
            ),
            youtubeEmbed: (props) => (
              <YouTubeEmbed youtubeLink={props.youtubeLink} />
            ),
            tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
            loopingVideo: (props) => (
              <LoopingVideo src={props.src} caption={props.caption} />
            ),
            image: (props) => (
              <Image src={props.src} alt={props.alt} caption={props.caption} />
            ),
            testimonial: (props) => (
              <Testimonial
                quote={props.quote}
                author={props.author}
                workplaceOrSocial={props.workplaceOrSocial}
                socialLink={props.socialLink}
              />
            ),
          }}
        />
      </div>
      <AllPosts posts={orderedPostFeed} authors={authors} />
    </div>
  )
}
