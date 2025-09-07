"use client";

import { useEffect } from 'react';
import SetsGrid from '../../components/SetsGrid';
import Link from 'next/link';

export default function SetsPage() {
  useEffect(() => {
    // Animación de entrada desde abajo
    const setsContainer = document.querySelector('.sets-container');
    if (setsContainer) {
      setsContainer.style.transform = 'translateY(100%)';
      setsContainer.style.opacity = '0';

      setTimeout(() => {
        setsContainer.style.transform = 'translateY(0)';
        setsContainer.style.opacity = '1';
        setsContainer.classList.add('slide-in');
      }, 100);
    }
  }, []);

  return (
    <div className="sets-page">
      {/* Hero Section */}
      <section
        className="sets-hero d-flex align-items-center justify-content-center text-center py-5"
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
            <i className="fas fa-music me-3"></i>
            Mis Sets
          </h1>
          <p className="lead">
            Una colección de experiencias sonoras únicas
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section
        className="sets-container section bg-dark text-light"
        style={{
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-warning display-6 fw-bold mb-4">Sets Destacados</h2>
              <p className="lead">
                Cada set es una historia musical cuidadosamente crafteada para crear
                momentos únicos e inolvidables. Desde deep house hasta techno energético,
                explora mi colección de experiencias sonoras.
              </p>
            </div>
          </div>

          {/* Grid de Sets */}
          <div className="sets-grid-container">
            <SetsGrid />
          </div>

          {/* Información adicional */}
          <div className="row mt-5">
            <div className="col-md-6 mb-4">
              <div className="info-card p-4 rounded">
                <h4 className="text-warning mb-3">
                  <i className="fas fa-download me-2"></i>
                  Descarga Gratuita
                </h4>
                <p>
                  Todos mis sets están disponibles para descarga gratuita.
                  Disfruta de la mejor música electrónica en cualquier momento y lugar.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="info-card p-4 rounded">
                <h4 className="text-warning mb-3">
                  <i className="fas fa-headphones me-2"></i>
                  Alta Calidad
                </h4>
                <p>
                  Todos los sets están masterizados en alta calidad para garantizar
                  la mejor experiencia auditiva posible.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link href="/contact" className="btn btn-warning btn-lg me-3">
              <i className="fas fa-calendar me-2"></i>
              Solicitar Set Personalizado
            </Link>
            <Link href="/events" className="btn btn-outline-light btn-lg">
              <i className="fas fa-calendar-alt me-2"></i>
              Ver Próximos Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Estilos específicos */}
      <style jsx>{`
        .sets-container.slide-in {
          animation: slideInFromBottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .sets-grid-container {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .sets-container.slide-in .sets-grid-container {
          animation: slideInUp 0.8s ease 0.3s forwards;
        }
        
        .info-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 193, 7, 0.2);
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: rgba(255, 193, 7, 0.1);
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 193, 7, 0.2);
        }
        
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .sets-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
