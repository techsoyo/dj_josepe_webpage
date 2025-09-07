// services/authService.js
//
// Authentication service encapsulating all calls related to user
// authentication and profile management.  When logging in or
// refreshing tokens, this service persists the token and user data
// into localStorage for client-side use.  It relies on the
// centralized axios instance from api.js.

import api from './api';

const authService = {
  /**
   * Attempt to authenticate with the provided credentials.  On
   * success, the returned token and user data are stored in
   * localStorage.  Errors are propagated to the caller.
   * @param {Object} credentials { email, password }
   */
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
    }
    return res;
  },

  /**
   * Log out the current user.  Clears stored tokens and optionally
   * informs the backend.  If the backend responds with an error we
   * simply ignore it and always clear local state.
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // silence network errors during logout
      console.error('Logout error', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
  },

  /**
   * Refresh the authentication token.  Useful when tokens expire.
   * Updates the stored token on success.
   */
  async refreshToken() {
    const res = await api.post('/auth/refresh');
    if (res?.token && typeof window !== 'undefined') {
      localStorage.setItem('auth_token', res.token);
    }
    return res;
  },

  /**
   * Retrieve the authenticated user's profile information.
   */
  async getProfile() {
    return await api.get('/auth/profile');
  },

  /**
   * Update the authenticated user's profile.  Accepts an object
   * containing the fields to update.
   */
  async updateProfile(data) {
    return await api.put('/auth/profile', data);
  },

  /**
   * Change the authenticated user's password.
   */
  async changePassword(data) {
    return await api.put('/auth/change-password', data);
  },

  /**
   * Retrieve the stored authentication token.  Returns null if
   * unavailable.
   */
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },

  /**
   * Retrieve the stored user details as an object, or null if
   * unavailable.
   */
  getUser() {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
};

export default authService;