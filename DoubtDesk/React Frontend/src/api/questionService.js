import axiosClient from "./axiosClient";

// NOTE: components currently import static data from data/questions.js.
// Swap those imports for these calls once a backend exists.

export const getQuestions = () => axiosClient.get("/questions");

export const getQuestionById = (id) => axiosClient.get(`/questions/${id}`);

export const createQuestion = (data) => axiosClient.post("/questions", data);
