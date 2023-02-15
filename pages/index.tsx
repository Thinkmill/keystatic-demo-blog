import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'

export async function getStaticProps() {
  const reader = createReader('', config)
  const homePage = await reader.singletons.home.read()
  const homePageContent = await (homePage?.content() || [])

  return {
    props: {
      home: {
        ...homePage,
        content: homePageContent,
      },
    },
  }
}

export default function Home({
  home,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DocumentRenderer document={home.content} />
}
