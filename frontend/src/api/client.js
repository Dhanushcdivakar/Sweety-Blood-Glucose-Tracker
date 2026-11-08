const BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Universal API request wrapper
 * Automatically injects the JWT token from localStorage and parses JSON responses.
 */
export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customConfig.headers,
  };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // Handle baseUrl whether it has trailing slash or not
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL.replace(/\/$/, "")}${cleanEndpoint}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        `Request failed with status ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If it's a 401 Unauthorized, we can clear token if expired
    if (err.status === 401 && !endpoint.includes("/auth/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Trigger event or let AuthContext handle state
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    throw err;
  }
}

export default apiClient;

