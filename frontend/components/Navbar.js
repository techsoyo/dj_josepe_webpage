'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Responsive navigation bar.  It mirrors the navigation from the
 * original Vue component, providing anchors to sections on the home
 * page and links to other pages.  When the user is authenticated a
 * link to the admin dashboard appears.
 */
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth on mount and whenever localStorage changes.
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleScrollLink = (sectionId) => {
    // When clicking a section link, navigate to the home page with a hash.
    router.push('/#' + sectionId);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          DJ&nbsp;JOSEPE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link${pathname === '/' ? ' active' : ''}`}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link p-0"
                onClick={() => handleScrollLink('about')}
              >
                Sobre&nbsp;Mí
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link p-0"
                onClick={() => handleScrollLink('sets')}
              >
                Sets
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link p-0"
                onClick={() => handleScrollLink('events')}
              >
                Eventos
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link p-0"
                onClick={() => handleScrollLink('testimonials')}
              >
                Testimonios
              </button>
            </li>
            <li className="nav-item">
              <Link
                href="/gallery"
                className={`nav-link${pathname === '/gallery' ? ' active' : ''}`}
              >
                Galería
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link${pathname === '/contact' ? ' active' : ''}`}
              >
                Contacto
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link href="/admin/dashboard" className="nav-link">
                  <i className="fas fa-cog me-1"></i> Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}