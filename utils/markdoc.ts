import Markdoc, {
  type Config,
  type Node,
  type RenderableTreeNodes,
} from "@markdoc/markdoc";
import { fields } from "@keystatic/core";

import { ContentComponents } from "../components/ComponentBlocks";

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

const richTextMarkdocConfig = fields.markdoc.createMarkdocConfig({
  options: richTextOptions,
  components: ContentComponents,
  render: {
    tags: {
      divider: "Divider",
      inlineCta: "InlineCTA",
      banner: "Banner",
      youtubeEmbed: "YouTubeEmbed",
      tweetEmbed: "TweetEmbed",
      loopingVideo: "LoopingVideo",
      image: "Image",
      testimonial: "Testimonial",
    },
  },
});

const homeMarkdocConfig = fields.markdoc.createMarkdocConfig({
  options: { bold: true },
});

function transform(node: Node, config: Config) {
  const errors = Markdoc.validate(node, config);
  if (errors.length > 0) {
    throw new Error(`Invalid Markdoc content: ${JSON.stringify(errors)}`);
  }

  return JSON.parse(
    JSON.stringify(Markdoc.transform(node, config)),
  ) as RenderableTreeNodes;
}

export function transformRichText(content: { node: Node }) {
  return transform(content.node, richTextMarkdocConfig);
}

export function transformHomeHeading(content: { node: Node }) {
  const transformed = transform(content.node, homeMarkdocConfig);

  return JSON.parse(
    JSON.stringify(transformed, (key, value) => {
      if (key === "name" && value === "p") return "HomeHeading";
      if (key === "name" && value === "strong") return "HomeStrong";
      return value;
    }),
  ) as RenderableTreeNodes;
}
