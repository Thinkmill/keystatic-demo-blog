export default function maybeTruncateTextBlock(
  textBlock: string,
  charLimit: number
) {
  if (textBlock.length > 200) {
    return `${textBlock.slice(0, charLimit)}…`;
  }
  return textBlock;
}
