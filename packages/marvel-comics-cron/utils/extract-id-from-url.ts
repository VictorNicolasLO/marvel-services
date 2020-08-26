export function extractIdFromUrl(url: string) {
  const fragments = url.split("/");
  return fragments[fragments.length];
}
