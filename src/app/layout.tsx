import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bento - Your Link in Bio',
  description: 'Create your personal link in bio page with a beautiful bento grid layout',
  keywords: ['link in bio', 'bento', 'portfolio', 'personal page'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
