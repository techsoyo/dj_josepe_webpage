'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../../../services/authService';

export const metadata = {
  title: 'Admin – Iniciar sesión',
  description: 'Acceso privado para el panel de administración.',
};

/**
 * Simple admin login page.  On submit it calls the authentication
 * service and, if successful, stores the token in localStorage and
 * redirects to the dashboard.  Any server side validation errors are
 * surfaced to the user.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.login(form);
      router.push('/admin/dashboard');
    } catch (err) {
      // if the backend returns a message use it, otherwise use a generic error
      const message = err?.response?.data?.message || 'Credenciales inválidas';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section bg-dark text-light">
      <div className="container" style={{ maxWidth: '480px' }}>
        <h1 className="text-center mb-4 text-warning">Iniciar sesión</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  );
}