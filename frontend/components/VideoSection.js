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
    <>
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
        .video-section {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 200vh;
        }
        .video-section video {
          width: 100%;
          height: 100vh;
          object-fit: cover;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .video-copy {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          font-size: 20vw;
          margin-left: -4vw;
          line-height: 1.0;
          background-color: rgb(8, 8, 8);
          user-select: none;
          mix-blend-mode: multiply;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          z-index: 2;
        }
        .video-copy h5 {
          color: #ffffff;
          letter-spacing: 1vw;
          margin: 0;
          transform-origin: center;
        }
        #dj {
          transform: scaleY(1.1);
          padding: 0 0 0 75vw;
        }
        #josepe {
          transform: scaleX(1.2) scaleY(1.45);
          padding: 0 0 5vh 16vw;
        }
      `}</style>
    </>
  );
}
