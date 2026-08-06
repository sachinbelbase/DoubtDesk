import axiosClient from "./axiosClient";

export const getStudentDashboard = () => {
  return axiosClient.get("/dashboard/student");
};

export const getTeacherDashboard = () => axiosClient.get("/dashboard/teacher");

export const getRecentTeacherQuestions = () =>
  axiosClient.get("/dashboard/teacher/recent");