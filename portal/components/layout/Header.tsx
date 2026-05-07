'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '/concepts', labelEn: 'Concepts', labelEs: 'Conceptos' },
  { href: '/journey', labelEn: 'Your Journey', labelEs: 'Tu Viaje' },
  { href: '/blog', labelEn: 'Blog', labelEs: 'Blog' },
  { href: '/directory', labelEn: 'Find a Practitioner', labelEs: 'Practicantes' },
  { href: '/book', labelEn: 'The Book', labelEs: 'El Libro' },
];

export function Header({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const label = (en: string, es: string) => (locale === 'es' ? es : en);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <span className="text-xl font-bold text-sky-700">Propiology</span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm font-medium text-gray-600 hover:text-sky-700 transition-colors"
            >
              {label(link.labelEn, link.labelEs)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={switchLanguage}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-50 transition-colors"
            aria-label="Switch language"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <Link
            href={`/${locale}/login`}
            className="rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 transition-colors"
          >
            {label('Login', 'Iniciar Sesión')}
          </Link>
        </div>
      </div>
    </header>
  );
}
