import './globals.css';
import dynamic from 'next/dynamic';

import Script from 'next/script';
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
import Footer from '../components/Footer';

export const metadata = {
  title: 'DJ Josepe - Sitio Oficial',
  description: 'DJ Josepe - Música electrónica profesional para eventos.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

/**
 * Root layout for the Next.js application.  This layout wraps every page
 * with a consistent navbar and footer.  It also includes the required
 * third‑party scripts (Bootstrap and FontAwesome) to provide styling
 * similar to the original Vue project.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}