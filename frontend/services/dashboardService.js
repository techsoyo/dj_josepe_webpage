// services/dashboardService.js
//
// Provides endpoints for the admin dashboard such as aggregated
// statistics, recent activity and analytics.  These endpoints are
// protected by authentication and the api instance automatically
// handles injecting the bearer token.

import api from './api';

const dashboardService = {
  /** Fetch high-level stats for the dashboard. */
  async getStats() {
    return await api.get('/admin/dashboard/stats');
  },

  /** Retrieve recent activity for the dashboard. */
  async getRecentActivity() {
    return await api.get('/admin/dashboard/activity');
  },

  /** Retrieve analytics data.  Accepts a period string (e.g. '7d', '30d'). */
  async getAnalytics(period = '30d') {
    return await api.get(`/admin/dashboard/analytics?period=${period}`);
  },
};

export default dashboardService;