export function youtubeEmbedId(youTubeLink: string) {
  const url = youTubeLink;
  let embedId = "";
  const parsedUrl = (url || "")
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsedUrl[2] !== undefined) {
    const parsedId = parsedUrl[2].split(/[^0-9a-z_-]/i);
    embedId = parsedId[0];
  } else {
    embedId = url;
  }
  return embedId;
}
