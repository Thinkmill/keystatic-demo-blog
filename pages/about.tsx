import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'
import Banner from '../components/Banner'

export async function getStaticProps() {
  const reader = createReader('', config)
  const aboutPage = await reader.singletons.about.read()
  const aboutPageContent = await (aboutPage?.content() || [])

  return {
    props: {
      about: {
        ...aboutPage,
        content: aboutPageContent,
      },
    },
  }
}

export default function About({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <DocumentRenderer
        document={about.content}
        componentBlocks={{
          Banner: (props) => (
            <Banner bodyText={props.bodyText} url={props.fields.url} />
          ),
        }}
      />
    </>
  )
}
