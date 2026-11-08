import apiClient from "./client";

export const readingApi = {
  /**
   * Fetch readings for the authenticated user (supports optional pagination ?page=1&limit=20)
   * @param {{ page?: number, limit?: number }} [params]
   */
  getReadings: (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.limit) query.append("limit", params.limit);
    const queryString = query.toString();
    const endpoint = queryString ? `/readings?${queryString}` : "/readings";

    return apiClient(endpoint, {
      method: "GET",
    });
  },

  /**
   * Add a new blood glucose reading
   * @param {{ date: string, slot: string, value: number }} data
   */
  createReading: (data) => {
    return apiClient("/readings", {
      method: "POST",
      body: data,
    });
  },

  /**
   * Update an existing reading
   * @param {string} id
   * @param {{ date?: string, slot?: string, value?: number }} data
   */
  updateReading: (id, data) => {
    return apiClient(`/readings/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  /**
   * Delete a reading by ID
   * @param {string} id
   */
  deleteReading: (id) => {
    return apiClient(`/readings/${id}`, {
      method: "DELETE",
    });
  },
};

export default readingApi;

