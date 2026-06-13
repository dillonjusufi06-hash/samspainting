import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { TawkChat } from '@/components/tawk-chat';
import './globals.css'; // Global styles

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Sam's Painting | Premium Fine Painting & Cabinet Refinishing",
  description: "Exquisite interior painting, cabinet finishes, and architectural wall coatings managed by meticulous master painters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} transition-colors duration-300`}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-100" suppressHydrationWarning>
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
