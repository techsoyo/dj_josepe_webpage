/**
 * Custom 404 page.  When no route matches in the application this page
 * is displayed.  It keeps the dark theme consistent with the rest of
 * the site.
 */
export default function NotFoundPage() {
  return (
    <div className="section bg-dark text-light">
      <div className="container text-center">
        <h1 className="display-4 mb-3">404</h1>
        <p className="lead">La página que buscas no existe.</p>
        <a href="/" className="btn btn-warning mt-3">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}