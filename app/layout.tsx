import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ContactFloatButton } from '@/components/contact-float-button';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Sam's Painting | House Painting in New Jersey",
  description: "Interior painting, exterior painting, cabinet painting, deck staining, epoxy floors, and commercial painting in Wayne and North Jersey. Free estimates. Call (201) 232-5978.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} transition-colors duration-300`}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-100" suppressHydrationWarning>
        {children}
        <ContactFloatButton />
      </body>
    </html>
  );
}
