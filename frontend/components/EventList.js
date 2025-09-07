'use client';

import { useEffect, useState } from 'react';
import eventsService from '../services/eventsService';

/**
 * EventList is a simplified version of the EventsCalendar component from
 * the Vue project.  It fetches upcoming events and displays them in a
 * list.  You can extend this component to include a calendar view
 * similar to the original implementation.
 */
export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    eventsService
      .getEvents()
      .then((data) => {
        // data may be wrapped in an object depending on backend, handle both cases
        const list = Array.isArray(data) ? data : data.data ?? [];
        setEvents(list);
      })
      .catch(() => {
        setError('Error al cargar los eventos. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando eventos...</span>
        </div>
        <p className="text-muted mt-2">Cargando eventos...</p>
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

  if (events.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="fas fa-calendar-times fa-2x mb-2 text-muted"></i>
        <p className="text-muted">No hay eventos programados</p>
      </div>
    );
  }

  return (
    <div className="row">
      {events.map((event) => (
        <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
          <div className="card card-dark h-100">
            <div className="card-body">
              <h5 className="card-title text-warning">{event.title}</h5>
              <p className="card-text mb-1">
                <i className="fas fa-calendar me-1"></i>{' '}
                {new Date(event.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {event.location && (
                <p className="card-text mb-1">
                  <i className="fas fa-map-marker-alt me-1"></i>{' '}
                  {event.location}
                </p>
              )}
              {event.description && <p className="card-text">{event.description}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}