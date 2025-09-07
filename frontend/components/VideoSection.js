"use client";

/*
 * VideoSection: mismo layout/estilos que tu versión,
 * pero GSAP/ScrollTrigger se cargan SOLO en cliente (useEffect)
 * para evitar SSR errors.
 */

import { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });
const montserratBold = Montserrat({ subsets: ["latin"], weight: ["700"] });

export default function VideoSection() {
  const videoRef = useRef(null);
  const djRef = useRef(null);
  const josepeRef = useRef(null);
  const triggerRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    let ctx; // gsap.context para limpiar fácil
    let isMounted = true;

    (async () => {
      // Import dinámico SOLO en cliente
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/dist/ScrollTrigger");
      const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      if (!isMounted) return;

      // Encapsulamos animaciones en el nodo raíz
      ctx = gsap.context(() => {
        if (!textContainerRef.current || !triggerRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        });

        // Usar 'y' (transform) es más fiable que 'translateY'
        tl.to(
          textContainerRef.current,
          { y: -window.innerHeight },
          0
        );
      }, triggerRef);
    })();

    return () => {
      isMounted = false;
      ctx?.revert(); // limpia ScrollTriggers/animations
    };
  }, []);

  return (
    <div id="video-component">
      <div ref={triggerRef} className="video-section">
        <video
          ref={videoRef}
          src="/video-dj.mp4"
          loop
          autoPlay
          muted
          playsInline
        />
        <div ref={textContainerRef} className="video-copy">
          <h5 id="dj" ref={djRef} className={montserrat.className}>
            DJ
          </h5>
          <h5 id="josepe" ref={josepeRef} className={montserratBold.className}>
            JOSEPE
          </h5>
        </div>
      </div>


      {/* Estilos idénticos y acotados al componente (styled-jsx) */}
      <style jsx>{`
        /* Contenedor principal de la sección de video 
        overflow: hidden → Si lo quitas: el contenido que se desborde será visible (puede romper el layout)
        position: relative → Si lo cambias: los elementos position: absolute dentro se posicionarán respecto a otro contenedor
        height: 200vh → Si lo reduces: la animación de scroll será más corta; si lo aumentas, será más larga */
        #video-component .video-section {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 200vh;
        }

        /* Video de fondo fijo 
        position: fixed → Si lo cambias a absolute: el video se moverá con el scroll en lugar de quedarse fijo
        object-fit: cover → Si lo cambias a contain: el video podría mostrar barras negras; fill lo deformaría
        z-index: 1 → Si lo subes: el video tapará el texto; si lo bajas, el texto podría no verse*/
        #video-component .video-section video {
          width: 100%;
          height: 100vh;
          object-fit: cover;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
        }

        /* Estilos base para los títulos h5 */
        #video-component h5 {
          color: #ffffff;
          letter-spacing: 1vw;
          margin: 0;
          transform-origin: center;
        }

        /* Estilos comentados - versión anterior
        #video-component #dj {
          transform: scaleY(5.1);
          padding: 0 0 5vh 75vw;
        }

        #video-component #josepe {
          transform: scaleX(1.2) scaleY(1.45);
          padding: 0 0 5vh 16vw;
        } */

        /* Contenedor del texto superpuesto 
        position: fixed → Si lo cambias: el texto se moverá con el scroll en lugar de mantenerse fijo
        mix-blend-mode: multiply → Si lo quitas: perderás el efecto de mezcla con el video de fondo
        background-color: rgb(2, 2, 2) → Si lo cambias: alterará el efecto visual de superposición
        z-index: 2 → Si lo bajas: el texto quedará detrás del video
        */  
        #video-component .video-copy {
          height: 100vh;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin-left: -8vw;
          line-height: 1.0;
          background-color: rgb(8, 8, 8);
          user-select: none;
          mix-blend-mode: multiply;
           display: flex;
         flex-direction: column;
          justify-content: center;
          z-index: 2;
        }

        /* Texto "DJ" - más pequeño y posicionado a la derecha */
        #video-component #dj {
          color: #ffffff;
          font-weight: 400;
          letter-spacing: 0.5vw;
          margin: 0;
          padding-left: 60vw;
          transform: scaleY(1.1);
          transform-origin: center;
          font-size: 13vw;
        }

        /* Texto "JOSEPE" - más grande y posicionado a la izquierda */
        #video-component #josepe {
          color: #ffffff;
          font-weight: 700;
          letter-spacing: 0.5vw;
          margin: 0;
          padding-left: 15vw;
          padding-bottom: 5vh;
          transform: scaleX(1.2) scaleY(1.7);
          transform-origin: center;
          font-size: 20vw;
        }

        /* Ajustes responsivos para tablets */
        @media (max-width: 768px) {
          #video-component #dj {
            padding-left: 50vw;
            letter-spacing: 2vw;
            font-size: 20vw;
          }

          #video-component #josepe {
            padding-left: 10vw;
            letter-spacing: 2vw;
            font-size: 45vw;
          }
        }

        /* Ajustes responsivos para móviles */
        @media (max-width: 480px) {
          #video-component #dj {
            padding-left: 30vw;
            font-size: 18vw;
          }

          #video-component #josepe {
            padding-left: 5vw;
            font-size: 40vw;
          }
        }
      `}</style>
    </div>
  );
}
