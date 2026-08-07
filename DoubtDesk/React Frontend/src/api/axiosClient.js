import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("doubtdesk_access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Refresh the access token on 401, retry the original request once
let isRefreshing = false;
let pendingRequests = [];

const resolvePending = (newToken) => {
  pendingRequests.forEach((cb) => cb(newToken));
  pendingRequests = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      const refreshToken = localStorage.getItem("doubtdesk_refresh_token");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push((newToken) => {
            if (!newToken) {
              reject(error);
              return;
            }
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${axiosClient.defaults.baseURL}/refresh`,
          { refresh_token: refreshToken },
        );

        const newAccessToken = data.access_token;
        localStorage.setItem("doubtdesk_access_token", newAccessToken);

        isRefreshing = false;
        resolvePending(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        resolvePending(null);

        localStorage.removeItem("doubtdesk_user");
        localStorage.removeItem("doubtdesk_access_token");
        localStorage.removeItem("doubtdesk_refresh_token");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
