export const inject = async <T>(
  slug: string,
  collection: { read: (slug: string) => Promise<T> }
): Promise<(T & { slug: string }) | null> => {
  return { ...(await collection.read(slug)), slug };
};
