import axiosClient from "./axiosClient";

export const getStudents = () => axiosClient.get("/admin/students");

export const getTeachers = () => axiosClient.get("/admin/teachers");

export const getQuestions = () => axiosClient.get("/admin/questions");

export const deleteQuestion = (questionId) =>
  axiosClient.delete(`/admin/questions/${questionId}`);

export const blockStudent = (studentId) =>
  axiosClient.patch(`/admin/students/${studentId}/block`);

export const unblockStudent = (studentId) =>
  axiosClient.patch(`/admin/students/${studentId}/unblock`);

export const blockTeacher = (teacherId) =>
  axiosClient.patch(`/admin/teachers/${teacherId}/block`);

export const unblockTeacher = (teacherId) =>
  axiosClient.patch(`/admin/teachers/${teacherId}/unblock`);