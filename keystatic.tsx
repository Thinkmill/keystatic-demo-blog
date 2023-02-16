import { collection, component, config, fields, singleton } from 'keystatic'
import Banner from './components/Banner'
import InlineCTA from './components/InlineCTA'
import Divider from './components/Divider'
import YouTubeEmbed from './components/YouTubeEmbed'

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
          componentBlocks: {
            divider: component({
              label: 'Divider',
              preview: (props) => (
                <Divider noIcon={props.fields.noIcon.value} />
              ),
              schema: {
                noIcon: fields.checkbox({ label: 'No Icon' }),
              },
            }),
          },
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
            divider: component({
              label: 'Divider',
              preview: (props) => (
                <Divider noIcon={props.fields.noIcon.value} />
              ),
              schema: {
                noIcon: fields.checkbox({ label: 'No Icon' }),
              },
            }),
            banner: component({
              label: 'Banner',
              preview: (props) => (
                <Banner
                  heading={props.fields.heading.value}
                  bodyText={props.fields.bodyText.value}
                  externalLink={{
                    href: props.fields.externalLinkHref.value,
                    label: props.fields.externalLinkLabel.value,
                  }}
                />
              ),
              schema: {
                heading: fields.text({
                  label: 'Heading',
                }),
                bodyText: fields.text({
                  label: 'Body Text',
                }),
                externalLinkHref: fields.url({
                  label: 'External Link',
                }),
                externalLinkLabel: fields.text({
                  label: 'Link Label',
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
        wordCount: fields.integer({
          label: 'Word count',
        }),
        content: fields.document({
          label: 'Content',
          componentBlocks: {
            divider: component({
              label: 'Divider',
              preview: (props) => (
                <Divider noIcon={props.fields.noIcon.value} />
              ),
              schema: {
                noIcon: fields.checkbox({ label: 'No Icon' }),
              },
            }),
            inlineCta: component({
              label: 'Inline CTA',
              preview: (props) => (
                <InlineCTA
                  title={props.fields.title.value}
                  summary={props.fields.summary.value}
                  linkButton={{
                    externalLink: props.fields.externalLink.value,
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
                externalLink: fields.checkbox({
                  label: 'External Link',
                }),
              },
            }),
            banner: component({
              label: 'Banner',
              preview: (props) => (
                <Banner
                  heading={props.fields.heading.value}
                  bodyText={props.fields.bodyText.value}
                  externalLink={{
                    href: props.fields.externalLinkHref.value,
                    label: props.fields.externalLinkLabel.value,
                  }}
                />
              ),
              schema: {
                heading: fields.text({
                  label: 'Heading',
                }),
                bodyText: fields.text({
                  label: 'Body Text',
                }),
                externalLinkHref: fields.url({
                  label: 'External Link',
                }),
                externalLinkLabel: fields.text({
                  label: 'Link Label',
                }),
              },
            }),
            youtubeEmbed: component({
              label: 'YouTube Embed',
              preview: (props) => (
                <YouTubeEmbed youtubeLink={props.fields.youtubeLink.value} />
              ),
              schema: {
                youtubeLink: fields.url({
                  label: 'YouTube URL',
                }),
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
