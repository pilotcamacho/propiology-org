import Link from 'next/link';

export function Footer({ locale }: { locale: string }) {
  const label = (en: string, es: string) => (locale === 'es' ? es : en);

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold text-sky-700">Propiology</span>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              {label(
                'The study of oneself — a framework for self-knowledge and personal transformation.',
                'El estudio de uno mismo — un marco para el autoconocimiento y la transformación personal.'
              )}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {label('Explore', 'Explorar')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href={`/${locale}/concepts`} className="hover:text-sky-700">{label('Concepts', 'Conceptos')}</Link></li>
              <li><Link href={`/${locale}/journey`} className="hover:text-sky-700">{label('Your Journey', 'Tu Viaje')}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-sky-700">Blog</Link></li>
              <li><Link href={`/${locale}/resources`} className="hover:text-sky-700">{label('Resources', 'Recursos')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {label('Community', 'Comunidad')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href={`/${locale}/directory`} className="hover:text-sky-700">{label('Find a Practitioner', 'Practicantes')}</Link></li>
              <li><Link href={`/${locale}/book`} className="hover:text-sky-700">{label('The Book', 'El Libro')}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-sky-700">{label('About', 'Nosotros')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Propiology.org. {label('All rights reserved.', 'Todos los derechos reservados.')}</p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link href={`/${locale}/privacy`} className="hover:text-sky-700">{label('Privacy Policy', 'Política de Privacidad')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-sky-700">{label('Terms of Service', 'Términos de Servicio')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
