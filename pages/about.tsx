import type { InferGetStaticPropsType } from 'next'
import { createReader } from 'keystatic/reader'
import config from '../keystatic'
import { DocumentRenderer } from 'keystatic/renderer'
import Banner from '../components/Banner'
import Divider from '../components/Divider'
import Testimonial from '../components/Testimonial'

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
    <div className='mx-auto px-4 md:px-10 prose max-w-7xl'>
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
  )
}
