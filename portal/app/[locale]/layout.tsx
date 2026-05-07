import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Propiology',
    default: 'Propiology — The Study of Oneself',
  },
  description:
    'Propiology is a comprehensive framework for self-knowledge and personal transformation inspired by the metaphor of sailplane flight.',
  keywords: ['propiology', 'self-knowledge', 'personal development', 'propiología', 'autoconocimiento'],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
