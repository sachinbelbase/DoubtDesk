import axiosClient from "./axiosClient";

/**
 * Create a new question
 */
export const createQuestion = (data) => axiosClient.post("/questions", data);

export const getMyQuestions = () => axiosClient.get("/questions/me");


/**
 * Get all questions
 */
export const getQuestions = (params = {}) =>
  axiosClient.get("/questions", { params });

/**
 * Update a question
 */
export const updateQuestion = (questionId, data) =>
  axiosClient.put(`/questions/${questionId}`, data);

/**
 * Delete a question
 */
export const deleteQuestion = (questionId) =>
  axiosClient.delete(`/questions/${questionId}`);

/**
 * Update question status
 */
export const updateQuestionStatus = (questionId, status) =>
  axiosClient.put(`/questions/${questionId}/status`, {
    status,
  });

