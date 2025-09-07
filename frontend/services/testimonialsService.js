// services/testimonialsService.js
//
// Exposes operations related to testimonials.  Visitors can fetch
// testimonials to display on the public site, while admins can
// create, update and delete testimonials.  Additional statistics
// endpoints are also provided.

import api from './api';

const testimonialsService = {
  /** Fetch a list of testimonials.  Optional params may include
   * filters and pagination.
   */
  async getTestimonials(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return await api.get(`/testimonials${qs ? `?${qs}` : ''}`);
  },

  /** Retrieve a single testimonial. */
  async getTestimonial(id) {
    return await api.get(`/testimonials/${id}`);
  },

  /** Create a new testimonial. */
  async createTestimonial(data) {
    return await api.post('/testimonials', data);
  },

  /** Update an existing testimonial. */
  async updateTestimonial(id, data) {
    return await api.put(`/testimonials/${id}`, data);
  },

  /** Delete a testimonial by id. */
  async deleteTestimonial(id) {
    return await api.delete(`/testimonials/${id}`);
  },

  /** Retrieve testimonial statistics for the admin dashboard. */
  async getStatistics() {
    return await api.get('/testimonials/statistics');
  },
};

export default testimonialsService;