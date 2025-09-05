'use client';

/**
 * Simple footer component.  It includes copyright information and
 * social media links.  You can customise the links to point to your
 * actual profiles.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 bg-dark text-light">
      <div className="container text-center">
        <div className="mb-2">
          <a
            href="https://www.facebook.com/"
            className="me-3 text-warning"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/"
            className="me-3 text-warning"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            className="text-warning"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="mb-0">
          &copy; {year} DJ Josepe.  Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}