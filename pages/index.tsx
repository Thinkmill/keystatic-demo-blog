import type { InferGetStaticPropsType } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import AllPosts from "../components/AllPosts";
import type {
  ExternalArticleWithTypeProps,
  PostsWithTypeProps,
  PostOrExternalArticleProps,
} from "../components/AllPosts";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Divider from "../components/Divider";

export type PostProps = InferGetStaticPropsType<
  typeof getStaticProps
>["posts"][number];

export type AuthorProps = InferGetStaticPropsType<
  typeof getStaticProps
>["authors"][number];

export type ExternalArticleProps = InferGetStaticPropsType<
  typeof getStaticProps
>["externalArticles"][number];

async function getHomeData() {
  const reader = createReader("", config);
  const homePage = await reader.singletons.home.read();
  const homePageHeading = await (homePage?.heading() || []);

  return {
    ...homePage,
    heading: homePageHeading,
  };
}

async function getPostData() {
  const reader = createReader("", config);
  const postSlugs = await reader.collections.posts.list();
  const postData = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      const content = (await post?.content()) || [];
      return {
        ...post,
        slug,
        content,
      };
    })
  );

  return postData;
}

async function getExternalArticleData() {
  const reader = createReader("", config);
  const externalArticles = await reader.collections.externalArticles.list();
  const externalArticleData = await Promise.all(
    externalArticles.map(async (slug) => {
      const externalArticle = await reader.collections.externalArticles.read(
        slug
      );

      return {
        ...externalArticle,
      };
    })
  );
  return externalArticleData;
}

async function getAllAuthors() {
  const reader = createReader("", config);
  const authorsList = await reader.collections.authors.list();
  const allAuthors = await Promise.all(
    authorsList.map(async (slug) => {
      return await reader.collections.authors.read(slug);
    })
  );
  return authorsList.map((el, index) => {
    return { slug: el, ...allAuthors[index] };
  });
}

export async function getStaticProps() {
  const [home, posts, externalArticles, authors] = await Promise.all([
    getHomeData(),
    getPostData(),
    getExternalArticleData(),
    getAllAuthors(),
  ]);

  return {
    props: {
      home,
      posts,
      externalArticles,
      authors,
    },
  };
}

export default function Home({
  home,
  posts,
  externalArticles,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const PostsWithType = posts.map(
    (post): PostsWithTypeProps => ({ type: "post", ...post })
  );
  const ExternalArticleWithType = externalArticles.map(
    (article): ExternalArticleWithTypeProps => ({
      type: "externalArticle",
      ...article,
    })
  );

  const allPosts: PostOrExternalArticleProps[] = [
    ...PostsWithType,
    ...ExternalArticleWithType,
  ];
  const orderedPostFeed = allPosts.sort((a, b) => {
    if (a?.publishedDate && b?.publishedDate) {
      return new Date(a.publishedDate).getTime() <
        new Date(b.publishedDate).getTime()
        ? 1
        : -1;
    }

    return 0;
  });

  return (
    <div className="px-4 md:px-28 max-w-7xl mx-auto">
      <DocumentRenderer
        document={home.heading}
        renderers={{
          inline: {
            bold: ({ children }) => {
              return <span className="text-tm-red-brand">{children}</span>;
            },
          },
          block: {
            paragraph: ({ children }) => {
              return (
                <h1 className="text-center font-bold text-2xl max-w-xs sm:text-5xl sm:max-w-2xl lg:text-7xl lg:max-w-[60rem] mx-auto">
                  {children}
                </h1>
              );
            },
          },
        }}
      />
      <Divider />
      <AllPosts posts={orderedPostFeed} authors={authors} />
    </div>
  );
}
