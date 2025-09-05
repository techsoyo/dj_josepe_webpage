// services/api.js
//
// Centralized axios configuration for the Next.js application.  This
// module creates a singleton axios instance with sensible defaults and
// interceptors for attaching authentication tokens and handling
// common error scenarios.  The base URL is derived from the
// NEXT_PUBLIC_API_URL environment variable if defined, falling back
// to a local development server.  All responses are unwrapped so
// downstream code works with the actual payload rather than the
// axios response object.

import axios from 'axios';

// Determine API base URL.  Use the public runtime environment
// variable when available; otherwise default to a local API.  By
// prefixing with NEXT_PUBLIC we ensure values are exposed to the
// client.
const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:8000/api';

// Create a dedicated axios instance.  Setting a timeout prevents
// requests from hanging indefinitely.
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach bearer token from localStorage (client side only).  This
// interceptor runs before each request.  When rendering on the
// server, localStorage is undefined so we guard access accordingly.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Unwrap response data and handle common error codes globally.  In
// case of 401 we clear any stored credentials and redirect to the
// admin login page.  Other status codes can be handled here as
// needed.
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response) {
      const { status } = error.response;
      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          // Force redirect to login to obtain a new session
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;