import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Montserrat } from 'next/font/google'

// Configuración de las fuentes Montserrat
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] })
const montserratBold = Montserrat({ subsets: ['latin'], weight: ['700'] })

function Video() {
  // Registrar el plugin ScrollTrigger de GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Crear referencias para acceder a los elementos DOM
  // useRef(null) crea un objeto que puede "recordar" un valor entre renders
  // El null inicial es porque al principio no hay ningún elemento DOM
  const videoRef = useRef(null) // Referencia al elemento video
  const djRef = useRef(null) // Referencia al texto "DJ"
  const josepeRef = useRef(null) // Referencia al texto "JOSEPE"
  const triggerRef = useRef(null) // Referencia al contenedor que activa las animaciones
  const textContainerRef = useRef(null) // Referencia al contenedor de los textos

  useEffect(() => {
    // Crear una línea de tiempo de GSAP para las animaciones
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: triggerRef.current, // Elemento que activa la animación
          scrub: true, // La animación sigue el scroll suavemente
          start: "top top", // Inicia cuando el top del trigger llega al top de la pantalla
          end: "bottom top", // Termina cuando el bottom del trigger llega al top de la pantalla
        },
      }
    );

    // Animar TODO el contenedor de textos hacia arriba
    tl.to(
      textContainerRef.current, // Elemento contenedor de textos a animar
      {
        translateY: -window.innerHeight // Mover fuera de la pantalla hacia arriba
      },
      0 // Iniciar inmediatamente
    );
  }, []) // Array vacío significa que se ejecuta solo una vez al montar el componente

  return (
    <>

      {/* Contenedor principal con referencia para ScrollTrigger */}
      <div ref={triggerRef} className="video-section">
        {/* Elemento video con autoplay, loop y muted */}
        <video ref={videoRef} src="/video-dj.mp4" loop autoPlay muted></video>

        {/* Contenedor de los textos que se moverá como bloque */}
        <div ref={textContainerRef} className='video-copy'>
          {/* Texto "DJ" con fuente normal */}
          <h5 id="dj" ref={djRef} className={montserrat.className}>DJ</h5>

          {/* Texto "JOSEPE" con fuente negrita */}
          <h5 id="josepe" ref={josepeRef} className={montserratBold.className}>JOSEPE</h5>
        </div>
      </div>


    </>
  )
}

// Exportar el componente para usarlo en otros archivos
export default Video