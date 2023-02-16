export default function readTime(wordCount: number) {
  const totalReadTime = wordCount / 200
  return `${totalReadTime.toFixed(0)} min read`
}
