import type { Metadata } from 'next';
import './globals.css';
import AmplifyProvider from '@/components/providers/AmplifyProvider';

export const metadata: Metadata = {
  title: 'Propiology',
  description: 'The Study of Oneself',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AmplifyProvider>{children}</AmplifyProvider>;
}
