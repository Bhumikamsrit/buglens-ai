import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChangeRadar — AI Change Impact Copilot',
  description: 'AI-assisted engineering change impact analysis demo.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
