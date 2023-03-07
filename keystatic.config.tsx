import {
  collection,
  config,
  fields,
  GitHubConfig,
  LocalConfig,
  singleton,
} from '@keystatic/core'
import { ComponentBlocks } from './components/ComponentBlocks'

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      }

export default config({
  storage,
  singletons: {
    home: singleton({
      label: 'Home',
      path: 'content/pages/home/',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    about: singleton({
      label: 'About',
      path: 'content/pages/about/',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
  collections: {
    authors: collection({
      label: 'Authors',
      path: 'content/authors/*/',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Author name',
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        avatar: fields.image({
          label: 'Author avatar',
          directory: 'public/images/authors',
        }),
      },
    }),
    posts: collection({
      label: 'Posts',
      path: 'content/posts/*/',
      slugField: 'slug',
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
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        coverImage: fields.text({ label: 'Image' }),
        wordCount: fields.integer({
          label: 'Word count',
        }),
        authors: fields.array(
          fields.relationship({
            label: 'Post author',
            collection: 'authors',
          }),
          {
            label: 'Authors',
            itemLabel: (props) => props.value || 'Please select an author',
          }
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    externalArticles: collection({
      label: 'External Article',
      path: 'content/externalArticles/*/',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 4 } },
        }),
        directLink: fields.url({
          label: 'Article Link',
        }),
        source: fields.text({
          label: 'Link Source',
          defaultValue: 'Read more.',
        }),
        coverImage: fields.text({
          label: 'Cover Image',
        }),
        summary: fields.text({
          label: 'Summary',
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
      },
    }),
  },
})
