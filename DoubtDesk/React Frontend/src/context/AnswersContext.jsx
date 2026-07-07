import { createContext, useEffect, useState } from "react";

export const AnswersContext = createContext(null);

export function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("doubtdesk_answers");
    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, []);

  const addAnswer = (questionId, text, teacherName) => {
    const newAnswer = {
      id: Date.now(),
      questionId,
      text,
      teacherName: teacherName || "Teacher",
      time: "Just now",
    };

    const next = [...answers, newAnswer];
    setAnswers(next);
    localStorage.setItem("doubtdesk_answers", JSON.stringify(next));
  };

  const getAnswersForQuestion = (questionId) =>
    answers.filter((a) => a.questionId === questionId);

  return (
    <AnswersContext.Provider
      value={{ answers, addAnswer, getAnswersForQuestion }}
    >
      {children}
    </AnswersContext.Provider>
  );
}
