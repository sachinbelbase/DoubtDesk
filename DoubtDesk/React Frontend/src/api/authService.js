import axiosClient from "./axiosClient";

// NOTE: Login.jsx and Signup.jsx currently use a local mock (data/users.js)
// since there's no backend yet. Once one exists, call these instead.

export const loginRequest = (credentials) =>
  axiosClient.post("/auth/login", credentials);

export const registerRequest = (data) =>
  axiosClient.post("/auth/register", data);
