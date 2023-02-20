import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'
import Banner from '../components/Banner'
import Divider from '../components/Divider'

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
        }}
      />
    </>
  )
}
