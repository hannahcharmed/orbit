import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Orbit — Creator Intelligence',
  description: 'AI-powered analytics platform for lifestyle and fitness creators',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Orbit',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#03070F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-starlight antialiased">
        {/* Aurora ambient light blobs — fixed, no interaction */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* Top-right blue aurora */}
          <div className="absolute" style={{
            top: '-20%', right: '-10%',
            width: '60vw', height: '60vh',
            background: 'radial-gradient(ellipse, rgba(74,122,255,0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          {/* Bottom-left violet aurora */}
          <div className="absolute" style={{
            bottom: '-15%', left: '-10%',
            width: '55vw', height: '55vh',
            background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          {/* Center subtle teal aurora */}
          <div className="absolute" style={{
            top: '40%', left: '40%',
            width: '40vw', height: '40vh',
            background: 'radial-gradient(ellipse, rgba(45,212,191,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }} />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
