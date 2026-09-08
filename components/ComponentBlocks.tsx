import { fields } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

import Banner from "./Banner";
import InlineCTA from "./InlineCTA";
import Divider from "./Divider";
import YouTubeEmbed from "./YouTubeEmbed";
import TweetEmbed from "./TweetEmbed";
import LoopingVideo from "./LoopingVideo";
import Image from "./Image";
import Testimonial from "./Testimonial";

export const ContentComponents = {
  divider: block({
    label: "Divider",
    ContentView: ({ value }) => <Divider noIcon={value.noIcon} />,
    schema: {
      noIcon: fields.checkbox({ label: "No Icon" }),
    },
  }),
  inlineCta: block({
    label: "Inline CTA",
    ContentView: ({ value }) => (
      <InlineCTA
        title={value.title}
        summary={value.summary}
        linkButton={{
          externalLink: value.externalLink,
          href: value.href || "",
          label: value.linkLabel,
        }}
      />
    ),
    schema: {
      title: fields.text({ label: "Title" }),
      summary: fields.text({ label: "Summary" }),
      linkLabel: fields.text({ label: "Link Label" }),
      href: fields.url({
        label: "Link",
        defaultValue: "",
        validation: { isRequired: true },
      }),
      externalLink: fields.checkbox({ label: "External Link" }),
    },
  }),
  banner: block({
    label: "Banner",
    ContentView: ({ value }) => (
      <Banner
        heading={value.heading}
        bodyText={value.bodyText}
        externalLink={{
          href: value.externalLinkHref || "",
          label: value.externalLinkLabel,
        }}
      />
    ),
    schema: {
      heading: fields.text({ label: "Heading" }),
      bodyText: fields.text({ label: "Body Text" }),
      externalLinkHref: fields.url({ label: "External Link" }),
      externalLinkLabel: fields.text({ label: "Link Label" }),
    },
  }),
  youtubeEmbed: block({
    label: "YouTube Embed",
    ContentView: ({ value }) =>
      value.youtubeLink ? (
        <YouTubeEmbed youtubeLink={value.youtubeLink} />
      ) : null,
    schema: {
      youtubeLink: fields.url({ label: "YouTube URL" }),
    },
  }),
  tweetEmbed: block({
    label: "Tweet Embed",
    ContentView: ({ value }) => <TweetEmbed tweet={value.tweet || ""} />,
    schema: {
      tweet: fields.url({ label: "Tweet URL" }),
    },
  }),
  loopingVideo: block({
    label: "Looping Video",
    ContentView: ({ value }) => (
      <LoopingVideo src={value.src} caption={value.caption} />
    ),
    schema: {
      src: fields.text({ label: "File Name" }),
      caption: fields.text({ label: "Caption" }),
    },
  }),
  image: block({
    label: "Image",
    ContentView: ({ value }) => (
      <Image src={value.src} alt={value.alt} caption={value.caption} />
    ),
    schema: {
      src: fields.text({
        label: "File Name",
        validation: { length: { min: 4 } },
      }),
      alt: fields.text({
        label: "Alt text",
        validation: { length: { min: 4 } },
      }),
      caption: fields.text({ label: "Caption" }),
    },
  }),
  testimonial: block({
    label: "Testimonial",
    ContentView: ({ value }) => (
      <Testimonial
        quote={value.quote}
        author={value.author}
        workplaceOrSocial={value.workplaceOrSocial}
        socialLink={value.socialLink || ""}
      />
    ),
    schema: {
      quote: fields.text({ label: "Quote", multiline: true }),
      author: fields.text({ label: "Author" }),
      workplaceOrSocial: fields.text({
        label: "Workplace or Social account name",
      }),
      socialLink: fields.url({ label: "Social media link" }),
    },
  }),
};
