export const inject = async (slug: any, collection: any) => {
  return { ...(await collection.read(slug)), slug };
};
