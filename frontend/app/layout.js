import './globals.css';
import Script from 'next/script';
import Navbar from '../components/Navbar';
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
      <head>
        {/* Font Awesome CSS for icons used throughout the site */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Bootstrap JS bundle for interactive components such as modals and carousels */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}