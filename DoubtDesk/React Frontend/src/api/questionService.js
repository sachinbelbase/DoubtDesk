import axiosClient from "./axiosClient";

// aaile chai data/questions.js. lexu
// backend banesi swap garxu imports lai

export const getQuestions = () => axiosClient.get("/questions");

export const getQuestionById = (id) => axiosClient.get(`/questions/${id}`);

export const createQuestion = (data) => axiosClient.post("/questions", data);
