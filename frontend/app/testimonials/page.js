"use client";

import { useEffect } from 'react';
import TestimonialsList from '../../components/TestimonialsList';
import Link from 'next/link';

export default function TestimonialsPage() {
  useEffect(() => {
    // Animación de entrada desde la izquierda
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
      testimonialsContainer.style.transform = 'translateX(-100%)';
      testimonialsContainer.style.opacity = '0';

      setTimeout(() => {
        testimonialsContainer.style.transform = 'translateX(0)';
        testimonialsContainer.style.opacity = '1';
        testimonialsContainer.classList.add('slide-in');
      }, 100);
    }
  }, []);

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section
        className="testimonials-hero d-flex align-items-center justify-content-center text-center py-5"
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
            <i className="fas fa-quote-left me-3"></i>
            Testimonios
          </h1>
          <p className="lead">
            Lo que dicen quienes han vivido la experiencia DJ Josepe
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section
        className="testimonials-container section bg-dark text-light"
        style={{
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-warning display-6 fw-bold mb-4">Lo que dicen mis clientes</h2>
              <p className="lead">
                La satisfacción de mis clientes es mi mayor recompensa. Aquí puedes
                leer algunas de las experiencias que han compartido conmigo.
              </p>
            </div>
          </div>

          {/* Lista de Testimonios */}
          <div className="testimonials-list-container">
            <TestimonialsList />
          </div>

          {/* Sección de confianza */}
          <div className="trust-section mt-5">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="trust-card p-4 rounded">
                  <h4 className="text-warning mb-3">
                    <i className="fas fa-award me-2"></i>
                    Calidad Garantizada
                  </h4>
                  <p>
                    Más de 8 años de experiencia respaldan cada presentación.
                    Mi compromiso es ofrecer siempre la mejor experiencia musical.
                  </p>
                  <div className="rating mb-2">
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <span className="ms-2">5.0/5 Promedio</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="trust-card p-4 rounded">
                  <h4 className="text-warning mb-3">
                    <i className="fas fa-handshake me-2"></i>
                    Confianza Total
                  </h4>
                  <p>
                    Trabajo con equipos profesionales y siempre llego preparado.
                    Tu evento está en las mejores manos.
                  </p>
                  <div className="guarantees">
                    <div><i className="fas fa-check text-warning me-2"></i>Puntualidad garantizada</div>
                    <div><i className="fas fa-check text-warning me-2"></i>Equipos de respaldo</div>
                    <div><i className="fas fa-check text-warning me-2"></i>Música personalizada</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link href="/contact" className="btn btn-warning btn-lg me-3">
              <i className="fas fa-calendar me-2"></i>
              Reservar Fecha
            </Link>
            <Link href="/events" className="btn btn-outline-light btn-lg">
              <i className="fas fa-calendar-alt me-2"></i>
              Ver Próximos Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de call to action */}
      <section className="cta-section section bg-light text-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="text-warning display-6 fw-bold mb-3">
                ¿Listo para crear tu propia experiencia?
              </h3>
              <p className="lead mb-0">
                Únete a la lista de clientes satisfechos que han confiado en DJ Josepe
                para hacer de sus eventos algo verdaderamente especial.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <Link href="/contact" className="btn btn-warning btn-lg">
                <i className="fas fa-envelope me-2"></i>
                Contáctanos Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="process-section section bg-dark text-light">
        <div className="container">
          <h2 className="text-center mb-5 text-warning display-6 fw-bold">Mi Proceso de Trabajo</h2>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="process-step">
                <div className="step-number">1</div>
                <h5>Consulta Inicial</h5>
                <p>Hablamos sobre tu evento y tus expectativas musicales</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="process-step">
                <div className="step-number">2</div>
                <h5>Planificación</h5>
                <p>Creo un set personalizado que se adapte a tu audiencia</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="process-step">
                <div className="step-number">3</div>
                <h5>Preparación</h5>
                <p>Preparo todos los equipos y música para el gran día</p>
              </div>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="process-step">
                <div className="step-number">4</div>
                <h5>¡Show Time!</h5>
                <p>Llevo la energía y hago que todos vivan una experiencia única</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estilos específicos */}
      <style jsx>{`
        .testimonials-container.slide-in {
          animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .testimonials-list-container {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .testimonials-container.slide-in .testimonials-list-container {
          animation: slideInUp 0.8s ease 0.3s forwards;
        }
        
        .trust-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 193, 7, 0.2);
          transition: all 0.3s ease;
        }
        
        .trust-card:hover {
          background: rgba(255, 193, 7, 0.1);
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 193, 7, 0.2);
        }
        
        .rating {
          font-size: 1.1rem;
        }
        
        .guarantees div {
          margin-bottom: 5px;
        }
        
        .process-step {
          transition: all 0.3s ease;
        }
        
        .process-step:hover {
          transform: translateY(-10px);
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, var(--primary-color), #ffb300);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #000;
          margin: 0 auto 1rem auto;
          box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
        }
        
        .cta-section {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
        }
        
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
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
        
        .testimonials-hero::before {
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
