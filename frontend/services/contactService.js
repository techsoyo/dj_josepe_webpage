// services/contactService.js
//
// Handles sending contact form submissions as well as fetching and
// managing contact requests in the admin area.  Unlike some other
// services, most operations here are accessible to unauthenticated
// users (submitContactForm).  The admin endpoints require a valid
// token which is handled automatically by the api instance.

import api from './api';

const contactService = {
  /**
   * Submit a contact form.  The backend expects fields such as
   * name, email, phone and message.  Returns a confirmation or
   * validation errors.
   */
  async submitContactForm(data) {
    return await api.post('/contact', data);
  },

  /**
   * Retrieve a paginated list of contact requests for the admin.
   */
  async getContactRequests(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return await api.get(`/admin/contact-requests${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single contact request by id. */
  async getContactRequest(id) {
    return await api.get(`/admin/contact-requests/${id}`);
  },

  /** Update a contact request's details. */
  async updateContactRequest(id, data) {
    return await api.put(`/admin/contact-requests/${id}`, data);
  },

  /** Permanently delete a contact request. */
  async deleteContactRequest(id) {
    return await api.delete(`/admin/contact-requests/${id}`);
  },

  /** Mark a contact request as read. */
  async markAsRead(id) {
    return await api.put(`/admin/contact-requests/${id}/read`);
  },

  /** Mark a contact request as replied. */
  async markAsReplied(id) {
    return await api.put(`/admin/contact-requests/${id}/replied`);
  },
};

export default contactService;