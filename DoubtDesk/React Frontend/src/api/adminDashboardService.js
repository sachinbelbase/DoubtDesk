import axiosClient from "./axiosClient";

export const getAdminDashboard = () => axiosClient.get("/dashboard/admin");
