export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center">
        {locale === 'es' ? 'Bienvenido a Propiología' : 'Welcome to Propiology'}
      </h1>
      <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">
        {locale === 'es'
          ? 'El estudio de uno mismo — Despegar, despegar, despegar.'
          : 'The study of oneself — Take off, take off, take off.'}
      </p>
    </main>
  );
}
