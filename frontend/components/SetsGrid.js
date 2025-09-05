'use client';

import { useEffect, useState } from 'react';
import setsService from '../services/setsService';

/**
 * SetsGrid fetches and displays music sets from the backend.  Users can
 * filter the sets by genre.  The player and download functionality from
 * the original Vue implementation are omitted for brevity – you can
 * extend this component to include audio playback and downloads.
 */
export default function SetsGrid() {
  const [sets, setSets] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setsService
      .getSets()
      .then((data) => {
        setSets(data);
      })
      .catch(() => {
        setError('Error al cargar los sets. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'house', label: 'House' },
    { key: 'techno', label: 'Techno' },
    { key: 'deep', label: 'Deep House' },
    { key: 'commercial', label: 'Comercial' },
  ];

  const filteredSets =
    activeFilter === 'all'
      ? sets
      : sets.filter((set) => set.genre === activeFilter);

  return (
    <div className="sets-grid">
      {/* Filter Tabs */}
      <div className="filter-tabs mb-4">
        <ul className="nav nav-pills justify-content-center" role="tablist">
          {filters.map((filter) => (
            <li className="nav-item" role="presentation" key={filter.key}>
              <button
                type="button"
                className={`nav-link${activeFilter === filter.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando sets...</span>
          </div>
          <p className="text-muted mt-3">Cargando sets musicales...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Sets Grid */}
      {!loading && !error && (
        <div className="row g-4">
          {filteredSets.length > 0 ? (
            filteredSets.map((set) => (
              <div className="col-lg-4 col-md-6" key={set.id}>
                <div className="card card-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title text-warning">{set.title}</h5>
                    <p className="card-text">{set.description}</p>
                    <p className="text-muted mb-1">
                      <i className="fas fa-calendar me-1"></i>{' '}
                      {new Date(set.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-muted mb-3">
                      <i className="fas fa-clock me-1"></i>{' '}
                      {set.duration
                        ? `${Math.floor(set.duration / 60)}:${(set.duration % 60)
                          .toString()
                          .padStart(2, '0')}`
                        : '--:--'}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => alert('Funcionalidad de reproducción no implementada')}
                      >
                        <i className="fas fa-play"></i> Reproducir
                      </button>
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => alert('Funcionalidad de descarga no implementada')}
                      >
                        <i className="fas fa-download"></i> Descargar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="fas fa-music fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">
                {activeFilter === 'all'
                  ? 'Aún no se han subido sets musicales.'
                  : `No hay sets del género ${filters.find((f) => f.key === activeFilter)?.label}.`}
              </h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}