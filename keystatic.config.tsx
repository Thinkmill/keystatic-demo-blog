import {
  collection,
  config,
  fields,
  GitHubConfig,
  LocalConfig,
  singleton,
} from "@keystatic/core";
import { ContentComponents } from "./components/ComponentBlocks";

const richTextOptions = {
  bold: true,
  italic: true,
  strikethrough: true,
  code: true,
  heading: true,
  blockquote: true,
  orderedList: true,
  unorderedList: true,
  table: true,
  link: true,
  divider: true,
  codeBlock: true,
} as const;

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  singletons: {
    home: singleton({
      label: "Home",
      path: "content/pages/home",
      format: { contentField: "heading" },
      entryLayout: "content",
      schema: {
        heading: fields.markdoc({
          options: { bold: true },
          label: "Heading (note: text that is bolded will show up in red)",
        }),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/pages/about",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        content: fields.markdoc({
          label: "Content",
          options: richTextOptions,
          components: ContentComponents,
        }),
      },
    }),
  },
  collections: {
    authors: collection({
      label: "Authors",
      path: "content/authors/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        role: fields.text({ label: "Role" }),
        avatar: fields.image({
          label: "Author avatar",
          directory: "public/images/authors",
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      path: "content/posts/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/images/posts",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Post author",
            collection: "authors",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Please select an author",
          }
        ),
        content: fields.markdoc({
          label: "Content",
          options: richTextOptions,
          components: ContentComponents,
        }),
      },
    }),
    externalArticles: collection({
      label: "External Article",
      path: "content/externalArticles/*",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 4 } },
          },
        }),
        directLink: fields.url({
          label: "Article Link",
        }),
        source: fields.text({
          label: "Link Source",
          defaultValue: "Read more.",
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/external-articles",
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
      },
    }),
  },
});
