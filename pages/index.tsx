import type { InferGetStaticPropsType } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import dateFormatter from "../utils/dateFormatter";
import readTime from "../utils/readTime";
import Link from "next/link";
import maybeTruncateTextBlock from "../utils/maybeTruncateTextBlock";
import AvatarList from "../components/AvatarList";
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

export type PostsWithTypeProps = PostProps & {
  type: "post";
};
export type ExternalArticleWithTypeProps = ExternalArticleProps & {
  type: "externalArticle";
};

export type PostOrExternalArticleProps =
  | PostsWithTypeProps
  | ExternalArticleWithTypeProps;

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
      {orderedPostFeed.length === 0 ? (
        <h2>There are no posts available</h2>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3 pl-0">
          {orderedPostFeed.map((post, index) => {
            if (post.type === "externalArticle") {
              return (
                <li
                  className="items-stretch list-none rounded pl-0 my-0 external-link"
                  key={index}
                >
                  <a
                    href={post.directLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:text-tm-red-brand group"
                  >
                    <div className="border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg prose">
                      {post.coverImage && (
                        <div className="not-prose">
                          <img
                            src={`/${post.coverImage}`}
                            className="w-full rounded-t-md aspect-video"
                            alt="Cover image"
                          />
                        </div>
                      )}
                      <div className="p-8 border-t-2 border-slate-100">
                        <p className='text-slate-500 group-hover:text-tm-red-brand mt-0 mb-3 after:content-["_↗"]'>
                          {post.source}
                        </p>
                        <h3 className="mt-0 mb-3 group-hover:text-tm-red-brand">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="my-0">
                            {maybeTruncateTextBlock(post.summary, 100)}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                </li>
              );
            }
            if (post.type === "post") {
              const filteredAuthors = authors.filter((el) =>
                post.authors?.includes(el.slug)
              );
              return (
                <li
                  className="items-stretch list-none rounded pl-0 my-0"
                  key={index}
                >
                  <Link
                    href={`${post.slug}`}
                    className="no-underline hover:text-tm-red-brand group"
                  >
                    <div className="border-2 border-slate-100 group-hover:border-tm-red-brand rounded-lg prose">
                      {post.coverImage && (
                        <div className="not-prose">
                          <img
                            src={`/${post.coverImage}`}
                            className="w-full rounded-t-md aspect-video"
                            alt="Cover image"
                          />
                        </div>
                      )}
                      <div className="p-8 border-t-2  border-slate-100">
                        {post.publishedDate && (
                          <p className="mt-0 mb-3 text-slate-500">
                            {dateFormatter(post.publishedDate, "do MMM yyyy")}
                          </p>
                        )}
                        <h3 className="mt-0 mb-3 group-hover:text-tm-red-brand">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="mb-3 mt-0">
                            {maybeTruncateTextBlock(post.summary, 100)}
                          </p>
                        )}
                        <div className="flex flex-row gap-1 justify-between items-center">
                          <div className="flex gap-4 items-center not-prose">
                            <AvatarList authors={filteredAuthors} />
                          </div>
                          {post.wordCount && post.wordCount !== 0 ? (
                            <p className="my-0 shrink-0 px-2 py-1 border-2 border-slate-500 group-hover:border-tm-red-brand rounded-md">
                              {readTime(post.wordCount)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
