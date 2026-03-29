import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Research Compiler',
  description: 'Artifact-first scientific research compiler'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
