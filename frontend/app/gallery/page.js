export const metadata = {
  title: 'Galería - DJ Josepe',
  description:
    'Explora imágenes y recuerdos de eventos anteriores de DJ Josepe.',
};

/**
 * Gallery page.  In the original Vue project this page displayed a photo
 * gallery.  To keep the conversion concise the gallery is left as a
 * placeholder – you can fetch and render gallery images here by
 * extending this component.
 */
export default function GalleryPage() {
  return (
    <div className="section bg-dark text-light">
      <div className="container">
        <h1 className="text-center mb-4 text-warning">Galería</h1>
        <p className="text-center">
          Próximamente encontrarás aquí fotografías y recuerdos de nuestros
          eventos.  ¡Mantente atento!
        </p>
      </div>
    </div>
  );
}