/**
 * Appends or updates query parameters in a given URL or path string.
 *
 * Supports full URLs (e.g., "http://example.com"), relative paths (e.g., "/page"), or bare domains
 * (e.g., "example.com"). Preserves existing query parameters and merges new ones provided via the
 * `params` object.
 *
 * @example
 *   setQueryString('/page', { create: true }) // "/page?create=true"
 *   setQueryString('example.com?lang=en', { theme: 'dark' }) // "example.com?lang=en&theme=dark"
 *   setQueryString('http://site.com/view', { page: 2 }) // "http://site.com/view?page=2"
 *
 * @param {string} path - The original URL or path string.
 * @param {Record<string, string | number | boolean>} params - An object representing query
 *   parameters to append or update.
 * @returns {string} A new string with the query parameters merged into the original path.
 */
export const setQueryString = (
  path: string,
  params: Record<string, string | number | boolean>
): string => {
  const [base, queryString] = path.split('?')
  const searchParams = new URLSearchParams(queryString || '')

  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value))
  }

  const newQuery = searchParams.toString()
  return `${base}${newQuery ? `?${newQuery}` : ''}`
}
