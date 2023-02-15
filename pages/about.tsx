import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'

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

export default function About({ about }) {
  return (
    <>
      <h1>About page</h1>
      <DocumentRenderer document={about.content} />
    </>
  )
}
