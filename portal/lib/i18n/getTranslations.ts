export const i18nConfig = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
};

/**
 * Returns the locale to use, falling back to the default.
 * Use this in App Router server components.
 */
export function resolveLocale(locale: string): string {
  return i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;
}

/**
 * Dynamically loads a translation namespace from public/locales.
 */
export async function getTranslations(locale: string, namespace = 'common'): Promise<Record<string, unknown>> {
  try {
    const messages = await import(`../../public/locales/${locale}/${namespace}.json`);
    return messages.default ?? messages;
  } catch {
    // Fall back to default locale
    const fallback = await import(`../../public/locales/${i18nConfig.defaultLocale}/${namespace}.json`);
    return fallback.default ?? fallback;
  }
}
