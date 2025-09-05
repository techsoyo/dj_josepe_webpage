'use client';

import { useEffect, useState } from 'react';
import testimonialsService from '../services/testimonialsService';

/**
 * TestimonialsList fetches testimonials from the backend and displays
 * them in a simple grid.  Star ratings and client information are
 * included.  For a carousel experience similar to the Vue project you
 * can extend this component to use a library such as Swiper or
 * Bootstrap's carousel.
 */
export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    testimonialsService
      .getTestimonials()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data ?? [];
        setTestimonials(list);
      })
      .catch(() => {
        setError('Error al cargar los testimonios. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando testimonios...</span>
        </div>
        <p className="text-muted mt-2">Cargando testimonios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="fas fa-comments fa-2x mb-2 text-muted"></i>
        <p className="text-muted">No hay testimonios disponibles</p>
      </div>
    );
  }

  return (
    <div className="row">
      {testimonials.map((t) => (
        <div className="col-lg-4 col-md-6 mb-4" key={t.id}>
          <div className="card card-dark h-100">
            <div className="card-body">
              <div className="mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star${star <= t.rating ? ' text-warning' : ' text-muted'}`}
                  ></i>
                ))}
              </div>
              <blockquote className="blockquote mb-3">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              {t.eventType && (
                <p className="mb-1">
                  <i className="fas fa-tag me-1"></i>
                  {t.eventType}
                </p>
              )}
              {t.eventDate && (
                <p className="mb-1">
                  <i className="fas fa-calendar me-1"></i>
                  {new Date(t.eventDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}
              <hr />
              <p className="mb-0 fw-bold">{t.clientName}</p>
              {t.clientLocation && (
                <p className="mb-0">
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {t.clientLocation}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}