'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Footer mejorado con información de ubicación, contacto y auto-ocultación
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;

      // Show footer when mouse is in bottom 80px of screen
      if (mouseY >= windowHeight - 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Show footer when reaching bottom of page (within 100px)
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.footer
      className="py-4 bg-dark text-light fixed-bottom"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 193, 7, 0.3)',
        zIndex: 999
      }}
    >
      <div className="container">
        <div className="row">
          {/* Información de contacto */}
          <div className="col-md-4 mb-3">
            <h6 className="text-warning mb-2">
              <i className="fas fa-phone me-2"></i>
              Contacto
            </h6>
            <div className="mb-1">
              <i className="fas fa-envelope me-2 text-warning"></i>
              <a href="mailto:info@djjosepe.com" className="text-light text-decoration-none small">
                info@djjosepe.com
              </a>
            </div>
            <div className="mb-1">
              <i className="fas fa-phone me-2 text-warning"></i>
              <a href="tel:+34123456789" className="text-light text-decoration-none small">
                +34 123 456 789
              </a>
            </div>
            <div className="mb-1">
              <i className="fab fa-whatsapp me-2 text-warning"></i>
              <a href="https://wa.me/34123456789" className="text-light text-decoration-none small" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Información de ubicación */}
          <div className="col-md-4 mb-3">
            <h6 className="text-warning mb-2">
              <i className="fas fa-map-marker-alt me-2"></i>
              Ubicación
            </h6>
            <div className="mb-1">
              <i className="fas fa-city me-2 text-warning"></i>
              <span className="small">Madrid, España</span>
            </div>
            <div className="mb-1">
              <i className="fas fa-globe me-2 text-warning"></i>
              <span className="small">Eventos en toda España</span>
            </div>
            <div className="mb-1">
              <i className="fas fa-clock me-2 text-warning"></i>
              <span className="small">Disponible 24/7</span>
            </div>
          </div>

          {/* Redes sociales y copyright */}
          <div className="col-md-4 mb-3">
            <h6 className="text-warning mb-2">
              <i className="fas fa-share-alt me-2"></i>
              Síguenos
            </h6>
            <div className="mb-2">
              <motion.a
                href="https://www.facebook.com/"
                className="me-3 text-warning"
                aria-label="Facebook"
                whileHover={{ scale: 1.2, color: '#4267B2' }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-facebook-f"></i>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/"
                className="me-3 text-warning"
                aria-label="Instagram"
                whileHover={{ scale: 1.2, color: '#E4405F' }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a
                href="https://twitter.com/"
                className="me-3 text-warning"
                aria-label="Twitter"
                whileHover={{ scale: 1.2, color: '#1DA1F2' }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
              <motion.a
                href="https://www.youtube.com/"
                className="text-warning"
                aria-label="YouTube"
                whileHover={{ scale: 1.2, color: '#FF0000' }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-youtube"></i>
              </motion.a>
            </div>
            <p className="mb-0 small text-muted">
              &copy; {year} DJ Josepe. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Efectos de fondo */}
      <style jsx>{`
        .fixed-bottom {
          position: fixed;
        }

        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 400% 400%;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @media (max-width: 768px) {
          .col-md-4 {
            text-align: center;
          }
          
          .py-4 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
        }
      `}</style>
    </motion.footer>
  );
}
