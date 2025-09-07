// services/eventsService.js
//
// Provides functions for working with events on the backend.  This
// includes standard CRUD operations as well as retrieving calendar
// events for a given month and year.

import api from './api';

const eventsService = {
  /**
   * Fetch a list of events.  Accepts optional query parameters for
   * filtering and pagination.  Returns whatever structure the backend
   * provides (array or object).
   */
  async getEvents(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return await api.get(`/events${qs ? `?${qs}` : ''}`);
  },

  /** Retrieve a single event by id. */
  async getEvent(id) {
    return await api.get(`/events/${id}`);
  },

  /** Create a new event. */
  async createEvent(data) {
    return await api.post('/events', data);
  },

  /** Update an existing event. */
  async updateEvent(id, data) {
    return await api.put(`/events/${id}`, data);
  },

  /** Delete an event by id. */
  async deleteEvent(id) {
    return await api.delete(`/events/${id}`);
  },

  /**
   * Fetch events in a calendar format.  Provide month (1–12) and
   * year (full year) to retrieve events for that period.
   */
  async getCalendarEvents(month, year) {
    return await api.get(`/events/calendar?month=${month}&year=${year}`);
  },
};

export default eventsService;