import axiosClient from "./axiosClient";

export const loginUser = async ({ email, password }) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const loginResponse = await axiosClient.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token, refresh_token, role } = loginResponse.data;
  console.log(loginResponse.data);
  console.log("ROLE =", role);

  localStorage.setItem("doubtdesk_access_token", access_token);


  let profileResponse;

if (role === "student") {
  profileResponse = await axiosClient.get("/students/me");
} else if (role === "teacher") {
  profileResponse = await axiosClient.get("/teachers/me");
} else if (role === "admin") {
  profileResponse = {
    data: {
      id: 0,
      name: "Administrator",
      email: "admin@doubtdesk.com",
    },
  };
} else {
  throw new Error("Unsupported user role.");
}

  return {
    user: {
      ...profileResponse.data,
      role,
    },
    accessToken: access_token,
    refreshToken: refresh_token,
  };
};

export const registerStudentRequest = (data) =>
  axiosClient.post("/students/register", data);

export const registerTeacherRequest = (data) =>
  axiosClient.post("/teachers/register", data);
