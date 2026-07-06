import axiosClient from "./axiosClient";

// now i use data/users.js
// backend banesi sidai tya bata linxu

export const loginRequest = (credentials) =>
  axiosClient.post("/auth/login", credentials);

export const registerRequest = (data) =>
  axiosClient.post("/auth/register", data);
