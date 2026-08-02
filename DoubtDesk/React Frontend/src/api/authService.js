import axiosClient from "./axiosClient";

export const loginRequest = ({ email, password }) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  return axiosClient.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getStudentProfile = () => axiosClient.get("/students/me");

export const getTeacherProfile = () => axiosClient.get("/teachers/me");

export const registerStudentRequest = (data) =>
  axiosClient.post("/students/register", data);

export const registerTeacherRequest = (data) =>
  axiosClient.post("/teachers/register", data);
