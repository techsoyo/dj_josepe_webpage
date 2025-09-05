'use client';

import SetsGrid from '../components/SetsGrid';
import EventList from '../components/EventList';
import TestimonialsList from '../components/TestimonialsList';
import Link from 'next/link';

/**
 * HomePage replicates the landing page from the Vue project.  It uses
 * several client components to fetch sets, events and testimonials from
 * the backend API.  The hero section offers quick navigation to
 * individual sections of the page.
 */
export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="d-flex align-items-center justify-content-center text-center py-5"
        style={{
          minHeight: '90vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">DJ Josepe</h1>
          <p className="lead">
            Música electrónica que conecta corazones y hace vibrar la pista de
            baile
          </p>
          <div className="mt-4">
            <Link href="/contact" className="btn btn-warning btn-lg me-3">
              Contratar DJ
            </Link>
            <a href="#sets" className="btn btn-outline-light btn-lg">
              Ver Sets
            </a>
          </div>
        </div>
      </section>

      {/* Sets Section */}
      <section id="sets" data-scroll-margin className="section bg-dark text-light">
        <div className="container">
          <h2 className="text-center mb-5 text-warning">Sets Destacados</h2>
          <SetsGrid />
        </div>
      </section>

      {/* Events Section */}
      <section id="events" data-scroll-margin className="section bg-light text-dark">
        <div className="container">
          <h2 className="text-center mb-5 text-warning">Próximos Eventos</h2>
          <EventList />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-scroll-margin className="section bg-dark text-light">
        <div className="container">
          <h2 className="text-center mb-5 text-warning">Lo que dicen mis clientes</h2>
          <TestimonialsList />
        </div>
      </section>
    </div>
  );
}