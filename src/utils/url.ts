// Prefixes a site path with the deploy base (e.g. /bijay-site/), so links work on a GitHub Pages project site.
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
