import axiosClient from "./axiosClient";

export const getStudentProfile = () => axiosClient.get("/students/me");
