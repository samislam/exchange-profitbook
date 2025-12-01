/**
 * Extracts dynamic route parameter names from a Next.js-style route string.
 *
 * For example: ExtractRouteParams<"/posts/[id]/edit"> → "id"
 * ExtractRouteParams<"/org/[orgId]/user/[userId]"> → "orgId" | "userId"
 */
export type ExtractRouteParams<T extends string> =
  T extends `${string}[${infer Param}]${infer Rest}` ? Param | ExtractRouteParams<Rest> : never

/**
 * Builds an object type from a route template, where keys are the route parameter names and values
 * are strings.
 *
 * For example: BuildRouteParams<"/posts/[id]"> → { id: string }
 */
export type BuildRouteParams<T extends string> = {
  [K in ExtractRouteParams<T>]: string
}

/**
 * Resolves a dynamic route template by replacing `[param]` segments with actual values.
 *
 * @example
 *   resolveHref('/posts/[id]', { id: '123' }) // → "/posts/123"
 *
 * @example
 *   resolveHref('/org/[orgId]/user/[userId]', { orgId: 'abc', userId: 'def' }) // → "/org/abc/user/def"
 *
 * @template T - A route string with dynamic segments (e.g. `/posts/[id]`)
 * @param {T} template - The route string containing dynamic parameters in square brackets
 * @param {BuildRouteParams<T>} params - An object where keys match dynamic segments and values are
 *   substituted into the route
 * @returns {string} The fully resolved route string
 */
export function resolveHref<T extends string>(template: T, params: BuildRouteParams<T>): string {
  let result = template as string
  for (const key of Object.keys(params) as Array<keyof BuildRouteParams<T>>) {
    result = result.replace(`[${key}]`, params[key])
  }
  return result
}
