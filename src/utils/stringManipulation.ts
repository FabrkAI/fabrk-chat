export function getCompanyIdFromUrl(url: string) {
  if (!url) {
    return null;
  }
  const regex = /\/c\/([^/?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function replaceHyphenWithSpace(input: string): string {
  if (!input) {
    return "";
  }
  return input.replace(/-/g, " ");
}
