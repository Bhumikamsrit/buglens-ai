import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BugLens — AI Root Cause Investigator',
  description: 'Production-style AI incident investigation demo.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
