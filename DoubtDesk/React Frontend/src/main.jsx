import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BookmarksProvider } from "./context/BookmarksContext";
import { MyQuestionsProvider } from "./context/MyQuestionsContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <BookmarksProvider>
        <MyQuestionsProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MyQuestionsProvider>
      </BookmarksProvider>
    </AuthProvider>
  </BrowserRouter>
)
