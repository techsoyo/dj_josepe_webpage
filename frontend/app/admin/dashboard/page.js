'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dashboardService from '../../../services/dashboardService';

export const metadata = {
  title: 'Admin – Panel de control',
  description: 'Resumen de estadísticas y actividades recientes.',
};

/**
 * Admin dashboard page.  It loads basic statistics from the backend and
 * displays them.  If the user is not authenticated it will redirect
 * them back to the login page.  For a more comprehensive dashboard you
 * can extend this component to include charts and tables.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check authentication on client side
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      router.push('/admin/login');
    } else {
      dashboardService
        .getStats()
        .then((data) => setStats(data))
        .catch(() => {
          setError('No se pudieron obtener las estadísticas.');
        });
    }
  }, [router]);

  if (error) {
    return (
      <div className="section bg-dark text-light">
        <div className="container">
          <h1 className="text-warning mb-4">Panel de control</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="section bg-dark text-light">
        <div className="container">
          <h1 className="text-warning mb-4">Panel de control</h1>
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-dark text-light">
      <div className="container">
        <h1 className="text-warning mb-4">Panel de control</h1>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card card-dark text-center p-3">
              <h3 className="text-warning">{stats.totalSets}</h3>
              <p>Sets publicados</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-dark text-center p-3">
              <h3 className="text-warning">{stats.totalEvents}</h3>
              <p>Eventos próximos</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-dark text-center p-3">
              <h3 className="text-warning">{stats.totalTestimonials}</h3>
              <p>Testimonios recibidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}