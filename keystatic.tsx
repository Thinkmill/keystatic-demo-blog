import { collection, component, config, fields, singleton } from 'keystatic'
import Banner from './components/Banner'
import InlineCTA from './components/InlineCTA'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
      name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
    },
  },
  singletons: {
    home: singleton({
      label: 'Home',
      directory: 'content/pages/home',
      schema: {
        content: fields.document({
          label: 'Content',
        }),
      },
    }),
    about: singleton({
      label: 'About',
      directory: 'content/pages/about',
      schema: {
        content: fields.document({
          label: 'Content',
          componentBlocks: {
            banner: component({
              label: 'Banner',
              preview: (props) => (
                <Banner
                  bodyText={props.fields.bodyText.value}
                  url={props.fields.url.value}
                />
              ),
              schema: {
                bodyText: fields.text({
                  label: 'Body Text',
                }),
                url: fields.url({
                  label: 'URL',
                }),
              },
            }),
          },
        }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Posts',
      directory: 'content/posts',
      getItemSlug: (data) => data.slug,
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 4 } },
        }),
        slug: fields.text({
          label: 'Slug',
          validation: { length: { min: 4 } },
        }),
        summary: fields.text({
          label: 'Summary',
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        coverImage: fields.image({ label: 'Cover Image' }),
        content: fields.document({
          label: 'Content',
          componentBlocks: {
            inlineCta: component({
              label: 'Inline CTA',
              preview: (props) => (
                <InlineCTA
                  title={props.fields.title.value}
                  summary={props.fields.summary.value}
                  linkButton={{
                    href: props.fields.link.value,
                    label: props.fields.linkLabel.value,
                  }}
                />
              ),
              schema: {
                title: fields.text({ label: 'Title' }),
                summary: fields.text({ label: 'Summary' }),
                linkLabel: fields.text({ label: 'Link Label' }),
                link: fields.url({ label: 'Link' }),
              },
            }),
          },
        }),
        authors: fields.array(fields.text({ label: 'Name' }), {
          label: 'Authors',
          itemLabel: (props) => props.value,
        }),
      },
    }),
  },
})
