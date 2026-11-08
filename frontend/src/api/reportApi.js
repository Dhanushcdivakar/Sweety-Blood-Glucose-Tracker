import apiClient from "./client";

export const reportApi = {
  /**
   * Fetch daily, month-to-date, and previous month reports for a specific date
   * @param {string} [date] - Optional date in YYYY-MM-DD format (defaults to today)
   */
  getReports: (date) => {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return apiClient(`/reports${query}`, {
      method: "GET",
    });
  },
};

export default reportApi;

