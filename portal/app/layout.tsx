import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Propiology',
  description: 'The Study of Oneself',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
