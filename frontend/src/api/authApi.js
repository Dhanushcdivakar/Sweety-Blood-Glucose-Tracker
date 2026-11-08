import apiClient from "./client";

export const authApi = {
  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string }} data
   */
  register: (data) => {
    return apiClient("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  /**
   * Log in an existing user
   * @param {{ email: string, password: string }} data
   */
  login: (data) => {
    return apiClient("/auth/login", {
      method: "POST",
      body: data,
    });
  },
};

export default authApi;

