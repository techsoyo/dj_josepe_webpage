"use client";

import { useEffect } from 'react';
import EventList from '../../components/EventList';
import Link from 'next/link';

export default function EventsPage() {
  useEffect(() => {
    // Animación de entrada desde la derecha
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
      eventsContainer.style.transform = 'translateX(100%)';
      eventsContainer.style.opacity = '0';

      setTimeout(() => {
        eventsContainer.style.transform = 'translateX(0)';
        eventsContainer.style.opacity = '1';
        eventsContainer.classList.add('slide-in');
      }, 100);
    }
  }, []);

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section
        className="events-hero d-flex align-items-center justify-content-center text-center py-5"
        style={{
          minHeight: '40vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          position: 'relative',
          paddingTop: '6rem',
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold">
            <i className="fas fa-calendar-alt me-3"></i>
            Eventos
          </h1>
          <p className="lead">
            Próximas fechas donde podrás vivir la experiencia DJ Josepe
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section
        className="events-container section bg-light text-dark"
        style={{
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-warning display-6 fw-bold mb-4">Próximos Eventos</h2>
              <p className="lead">
                No te pierdas ninguna oportunidad de vivir una experiencia única.
                Aquí encontrarás todos mis próximos eventos y presentaciones.
              </p>
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="events-list-container">
            <EventList />
          </div>

          {/* Información sobre eventos privados */}
          <div className="row mt-5">
            <div className="col-lg-6 mb-4">
              <div className="event-info-card p-4 rounded shadow-sm">
                <h4 className="text-warning mb-3">
                  <i className="fas fa-star me-2"></i>
                  Eventos Privados
                </h4>
                <p className="mb-3">
                  ¿Quieres que sea parte de tu evento especial? Ofrezco servicios
                  para bodas, cumpleaños, eventos corporativos y fiestas privadas.
                </p>
                <ul className="list-unstyled">
                  <li><i className="fas fa-check text-warning me-2"></i>Equipos profesionales incluidos</li>
                  <li><i className="fas fa-check text-warning me-2"></i>Sets personalizados según el evento</li>
                  <li><i className="fas fa-check text-warning me-2"></i>Experiencia de más de 8 años</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="event-info-card p-4 rounded shadow-sm">
                <h4 className="text-warning mb-3">
                  <i className="fas fa-music me-2"></i>
                  Tipos de Eventos
                </h4>
                <div className="event-types">
                  <div className="event-type mb-2">
                    <strong>Clubs & Discotecas:</strong> Sets de alta energía para la pista de baile
                  </div>
                  <div className="event-type mb-2">
                    <strong>Festivales:</strong> Experiencias masivas con los mejores beats
                  </div>
                  <div className="event-type mb-2">
                    <strong>Eventos Corporativos:</strong> Ambiente profesional con toques modernos
                  </div>
                  <div className="event-type mb-2">
                    <strong>Bodas & Celebraciones:</strong> Música para momentos especiales
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link href="/contact" className="btn btn-warning btn-lg me-3">
              <i className="fas fa-envelope me-2"></i>
              Contratar para Evento
            </Link>
            <Link href="/sets" className="btn btn-outline-dark btn-lg">
              <i className="fas fa-music me-2"></i>
              Escuchar Sets
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="stats-section section bg-dark text-light">
        <div className="container">
          <h2 className="text-center mb-5 text-warning display-6 fw-bold">En Números</h2>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="stat-item">
                <h3 className="text-warning display-4 fw-bold">200+</h3>
                <p className="lead">Eventos Realizados</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="stat-item">
                <h3 className="text-warning display-4 fw-bold">50+</h3>
                <p className="lead">Clubs Visitados</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="stat-item">
                <h3 className="text-warning display-4 fw-bold">8+</h3>
                <p className="lead">Años de Experiencia</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="stat-item">
                <h3 className="text-warning display-4 fw-bold">100%</h3>
                <p className="lead">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estilos específicos */}
      <style jsx>{`
        .events-container.slide-in {
          animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .events-list-container {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .events-container.slide-in .events-list-container {
          animation: slideInUp 0.8s ease 0.3s forwards;
        }
        
        .event-info-card {
          background: rgba(255, 255, 255, 0.98);
          border: 2px solid rgba(255, 193, 7, 0.2);
          transition: all 0.3s ease;
        }
        
        .event-info-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 193, 7, 0.3);
        }
        
        .event-type {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 193, 7, 0.1);
        }
        
        .stat-item {
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          transform: translateY(-10px);
        }
        
        .stat-item h3 {
          text-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .events-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
