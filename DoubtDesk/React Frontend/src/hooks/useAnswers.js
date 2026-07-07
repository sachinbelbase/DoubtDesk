import { useContext } from "react";
import { AnswersContext } from "../context/AnswersContext";

export function useAnswers() {
  const context = useContext(AnswersContext);

  if (!context) {
    throw new Error("useAnswers must be used inside an <AnswersProvider>");
  }

  return context;
}
