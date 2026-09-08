import type { InferGetStaticPropsType } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import { RichText } from "../components/MarkdocRenderer";
import { transformRichText } from "../utils/markdoc";

import Seo from "../components/Seo";

export async function getStaticProps() {
  const reader = createReader("", config);
  const aboutPage = await reader.singletons.about.readOrThrow({
    resolveLinkedFiles: true,
  });

  return {
    props: {
      content: transformRichText(aboutPage.content),
    },
  };
}

export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mx-auto px-4 md:px-10 prose max-w-4xl">
      <Seo title="About | Solaris Daily News" />
      <RichText content={content} />
    </div>
  );
}
