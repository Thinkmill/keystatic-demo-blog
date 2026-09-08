import NextImage from "next/image";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import dateFormatter from "../utils/dateFormatter";
import readTime from "../utils/readTime";
import { RichText } from "../components/MarkdocRenderer";
import { transformRichText } from "../utils/markdoc";

import Seo from "../components/Seo";
import AvatarList from "../components/AvatarList";

export async function getStaticPaths() {
  const reader = createReader("", config);
  // Get collection of all posts
  const postSlugs = await reader.collections.posts.list();
  return {
    // Generate paths for each post
    paths: postSlugs.map((slug) => ({
      params: { post: slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.post;

  if (typeof slug !== "string") {
    throw new Error("What? WHYYYY");
  }

  const reader = createReader("", config);
  // Get data for post matching current slug
  const post = await reader.collections.posts.readOrThrow(slug, {
    resolveLinkedFiles: true,
  });

  const authorsData = await Promise.all(
    post.authors.map(async (authorSlug) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    })
  );

  return {
    props: {
      post: {
        ...post,
        content: transformRichText(post.content),
        slug,
      },
      authors: authorsData,
    },
  };
};

export type PostProps = InferGetStaticPropsType<typeof getStaticProps>["post"];
export type AuthorProps = InferGetStaticPropsType<
  typeof getStaticProps
>["authors"];

type TheLot = {
  post: PostProps;
  authors: AuthorProps;
};

export default function Post({ post, authors }: TheLot) {
  const names = authors.reduce(
    (acc: string[], author) =>
      "name" in author ? [...acc, author.name as string] : acc,
    []
  );
  const formattedNames = new Intl.ListFormat("en-AU")
    .format(names)
    .replace("and", "&");
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10">
      <Seo
        title={post.title}
        description={post?.summary}
        imagePath={
          post.coverImage
            ? `/images/posts/${post.slug}/${post.coverImage}`
            : "/images/seo-image.png"
        }
      />
      <div className="flex gap-3 items-center flex-wrap">
        {authors && <AvatarList authors={authors} />}
        <p className="font-semibold text-gray-900">{formattedNames}</p>
      </div>

      <div className="mt-4 flex justify-between">
        <span className="flex gap-1 text-gray-700">
          {post.publishedDate && (
            <p className="">
              {dateFormatter(post.publishedDate, "do MMM yyyy")}
            </p>
          )}
          {post.wordCount && post.wordCount !== 0 ? (
            <p className="">· {readTime(post.wordCount)}</p>
          ) : null}
        </span>
      </div>

      <div className="mt-8 prose max-w-none">
        <h1 className="mt-4">{post.title}</h1>
        <p className="text-lg">{post.summary}</p>
        {post.coverImage && (
          <div className="mt-10 not-prose">
            <NextImage
              width={1536}
              height={800}
              src={`/images/posts/${post.slug}/${post.coverImage}`}
              alt={`${post.title} Cover image`}
              className="w-full rounded-md"
            />
          </div>
        )}
        <div className="mt-10">
          <RichText content={post.content} />
        </div>
      </div>
    </div>
  );
}
