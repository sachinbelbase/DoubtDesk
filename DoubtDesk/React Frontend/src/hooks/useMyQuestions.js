import { useContext } from "react";
import { MyQuestionsContext } from "../context/MyQuestionsContext";

export function useMyQuestions() {
  const context = useContext(MyQuestionsContext);

  if (!context) {
    throw new Error(
      "useMyQuestions must be used inside a <MyQuestionsProvider>",
    );
  }

  return context;
}
