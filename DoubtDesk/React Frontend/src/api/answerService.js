import axiosClient from "./axiosClient";

/**
 * Create a new answer
 */
export const createAnswer = (data) =>
     axiosClient.post("/answers/", data);

/**
 * Get answers for a question
 */
export const getAnswers = (questionId) =>
     axiosClient.get(`/answers/${questionId}`);

/**
 * Update an answer
 */
export const updateAnswer = (answerId, data) =>
     axiosClient.put(`/answers/${answerId}`, data);

/**
 * Delete an answer
 */
export const deleteAnswer = (answerId) =>
     axiosClient.delete(`/answers/${answerId}`);