'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    // Solo en cliente
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link href="/home" className="navbar-brand fw-bold">DJ&nbsp;JOSEPE</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/inicio" className={`nav-link${pathname === '/inicio' ? ' active' : ''}`}>
                Inicio
              </Link>
            </li>

            {/* Enlaces que van a secciones de la home por hash */}
            <li className="nav-item">
              <Link href="/home#about" className="nav-link">Sobre&nbsp;Mí</Link>
            </li>
            <li className="nav-item">
              <Link href="/home#sets" className="nav-link">Sets</Link>
            </li>
            <li className="nav-item">
              <Link href="/home#events" className="nav-link">Eventos</Link>
            </li>
            <li className="nav-item">
              <Link href="/home#testimonials" className="nav-link">Testimonios</Link>
            </li>

            <li className="nav-item">
              <Link href="/gallery" className={`nav-link${pathname === '/gallery' ? ' active' : ''}`}>
                Galería
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={`nav-link${pathname === '/contact' ? ' active' : ''}`}>
                Contacto
              </Link>
            </li>

            {/* Si necesitas mostrar Admin cuando hay token, mantenlo como lo tenías */}
            {/* {isAuthenticated && (
              <li className="nav-item">
                <Link href="/admin/dashboard" className="nav-link">
                  <i className="fas fa-cog me-1"></i> Admin
                </Link>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
