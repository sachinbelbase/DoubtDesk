import axiosClient from "./axiosClient";

export const getStudents = () => axiosClient.get("/admin/students");

export const getTeachers = () => axiosClient.get("/admin/teachers");

export const getQuestions = () => axiosClient.get("/admin/questions");

export const deleteQuestion = (questionId) =>
  axiosClient.delete(`/admin/questions/${questionId}`);
