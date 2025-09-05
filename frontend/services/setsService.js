// services/setsService.js
//
// Functions for interacting with music sets on the backend.  These
// include standard CRUD operations as well as actions to increment
// play and download counts or upload associated files.  All calls
// return the unwrapped response data.

import api from './api';

const setsService = {
  /**
   * Retrieve a list of sets.  Accepts optional query parameters for
   * filtering and pagination.  The backend returns either an array or
   * an object with a `data` property; the caller is responsible for
   * handling whichever format is returned.
   */
  async getSets(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return await api.get(`/sets${qs ? `?${qs}` : ''}`);
  },

  /** Retrieve a single set by its identifier. */
  async getSet(id) {
    return await api.get(`/sets/${id}`);
  },

  /** Create a new set.  Accepts a data object describing the set. */
  async createSet(data) {
    return await api.post('/sets', data);
  },

  /** Update an existing set. */
  async updateSet(id, data) {
    return await api.put(`/sets/${id}`, data);
  },

  /** Delete a set by its identifier. */
  async deleteSet(id) {
    return await api.delete(`/sets/${id}`);
  },

  /**
   * Upload a file associated with a set.  The backend expects
   * multipart/form-data with fields `file` and `type`.  Type may be
   * 'audio' or 'image' depending on the use case.  Additional form
   * fields can be supplied via params if needed.
   */
  async uploadSetFile(id, file, type = 'audio') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return await api.post(`/sets/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /** Increment the play counter for a given set. */
  async incrementPlayCount(id) {
    return await api.post(`/sets/${id}/play`);
  },

  /** Increment the download counter for a given set. */
  async incrementDownloadCount(id) {
    return await api.post(`/sets/${id}/download`);
  },
};

export default setsService;