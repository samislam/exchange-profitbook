import { isAppLanguage } from '@/lib/next-intl/i18n-request'

/**
 * Safely remove the locale prefix from a pathname, if present.
 * Works with `always`, `as-needed`, and `never` prefix modes.
 *
 * Examples:
 *   stripLocale('/en')          => '/'
 *   stripLocale('/en/about')    => '/about'
 *   stripLocale('/tr/help/me')  => '/help/me'
 *   stripLocale('/enroll')      => '/enroll'
 *   stripLocale('/trending')    => '/trending'
 *
 * NEVER removes segments unless they match a configured locale.
 */
export function stripLocale(path: string): string {
  if (!path.startsWith('/')) return path

  const parts = path.split('/')
  // parts[0] = ""   (because path starts with '/')
  // parts[1] = segment that may or may not be a locale

  const maybeLocale = parts[1]

  // If it matches one of your actual locales, remove it
  if (isAppLanguage(maybeLocale)) {
    const rest = parts.slice(2).join('/')
    return '/' + rest // ensures leading slash
  }

  // No locale prefix → return as-is
  return path
}
