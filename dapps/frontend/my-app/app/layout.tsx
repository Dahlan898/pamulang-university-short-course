import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Avalanche dApp',
  description: 'Simple dApp Frontend using Next.js + Wagmi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}