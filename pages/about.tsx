import type { InferGetStaticPropsType } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

import Seo from "../components/Seo";
import Banner from "../components/Banner";
import InlineCTA from "../components/InlineCTA";
import Divider from "../components/Divider";
import YouTubeEmbed from "../components/YouTubeEmbed";
import TweetEmbed from "../components/TweetEmbed";
import LoopingVideo from "../components/LoopingVideo";
import Image from "../components/Image";
import Testimonial from "../components/Testimonial";

export async function getStaticProps() {
  const reader = createReader("", config);
  const aboutPage = await reader.singletons.about.read();
  const aboutPageContent = await (aboutPage?.content() || []);

  return {
    props: {
      about: {
        ...aboutPage,
        content: aboutPageContent,
      },
    },
  };
}

export default function About({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mx-auto px-4 md:px-10 prose max-w-4xl">
      <Seo title="About | Solaris Daily News" />
      <DocumentRenderer
        document={about.content}
        componentBlocks={{
          inlineCta: (props) => (
            <InlineCTA
              title={props.title}
              summary={props.summary}
              linkButton={{
                externalLink: props.externalLink,
                href: props.href,
                label: props.linkLabel,
              }}
            />
          ),
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
          youtubeEmbed: (props) => (
            <YouTubeEmbed youtubeLink={props.youtubeLink} />
          ),
          tweetEmbed: (props) => <TweetEmbed tweet={props.tweet} />,
          loopingVideo: (props) => (
            <LoopingVideo src={props.src} caption={props.caption} />
          ),
          image: (props) => (
            <Image src={props.src} alt={props.alt} caption={props.caption} />
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
  );
}
