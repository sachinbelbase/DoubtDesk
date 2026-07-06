import { createContext, useEffect, useState } from "react";

export const MyQuestionsContext = createContext(null);

export function MyQuestionsProvider({ children }) {
     const [myQuestions, setMyQuestions] = useState([]);

     // Restore previously asked questions on refresh
     useEffect(() => {
          const stored = localStorage.getItem("doubtdesk_my_questions");
          if (stored) {
               setMyQuestions(JSON.parse(stored));
          }
     }, []);

     const addQuestion = (question) => {
          const next = [question, ...myQuestions];
          setMyQuestions(next);
          localStorage.setItem("doubtdesk_my_questions", JSON.stringify(next));
     };

     return (
          <MyQuestionsContext.Provider value={{ myQuestions, addQuestion }}>
               {children}
          </MyQuestionsContext.Provider>
     );
}
