import Markdoc, { type RenderableTreeNodes } from "@markdoc/markdoc";
import React from "react";

import Banner from "./Banner";
import Divider from "./Divider";
import Image from "./Image";
import InlineCTA from "./InlineCTA";
import LoopingVideo from "./LoopingVideo";
import Testimonial from "./Testimonial";
import TweetEmbed from "./TweetEmbed";
import YouTubeEmbed from "./YouTubeEmbed";

const richTextComponents = {
  Divider: ({ noIcon }: { noIcon?: boolean }) => <Divider noIcon={noIcon} />,
  InlineCTA: ({
    title,
    summary,
    externalLink,
    href,
    linkLabel,
  }: {
    title: string;
    summary: string;
    externalLink: boolean;
    href: string;
    linkLabel: string;
  }) => (
    <InlineCTA
      title={title}
      summary={summary}
      linkButton={{ externalLink, href, label: linkLabel }}
    />
  ),
  Banner: ({
    heading,
    bodyText,
    externalLinkHref,
    externalLinkLabel,
  }: {
    heading: string;
    bodyText: string;
    externalLinkHref: string;
    externalLinkLabel: string;
  }) => (
    <Banner
      heading={heading}
      bodyText={bodyText}
      externalLink={{ href: externalLinkHref, label: externalLinkLabel }}
    />
  ),
  YouTubeEmbed: ({ youtubeLink }: { youtubeLink: string }) => (
    <YouTubeEmbed youtubeLink={youtubeLink} />
  ),
  TweetEmbed: ({ tweet }: { tweet: string }) => <TweetEmbed tweet={tweet} />,
  LoopingVideo: ({
    src,
    caption,
  }: {
    src: string;
    caption?: string;
  }) => <LoopingVideo src={src} caption={caption} />,
  Image: ({
    src,
    alt,
    caption,
  }: {
    src: string;
    alt: string;
    caption?: string;
  }) => <Image src={src} alt={alt} caption={caption} />,
  Testimonial: ({
    quote,
    author,
    workplaceOrSocial,
    socialLink,
  }: {
    quote: string;
    author: string;
    workplaceOrSocial?: string;
    socialLink?: string;
  }) => (
    <Testimonial
      quote={quote}
      author={author}
      workplaceOrSocial={workplaceOrSocial}
      socialLink={socialLink}
    />
  ),
};

export function RichText({
  content,
}: {
  content: RenderableTreeNodes;
}) {
  return Markdoc.renderers.react(content, React, {
    components: richTextComponents,
  });
}

export function HomeHeading({
  content,
}: {
  content: RenderableTreeNodes;
}) {
  return Markdoc.renderers.react(content, React, {
    components: {
      HomeHeading: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-center font-bold text-2xl max-w-xs sm:text-5xl sm:max-w-2xl lg:text-7xl lg:max-w-[60rem] mx-auto">
          {children}
        </h1>
      ),
      HomeStrong: ({ children }: { children: React.ReactNode }) => (
        <span className="text-cyan-700">{children}</span>
      ),
    },
  });
}
