import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import AppProviders from "./context/AppProviders";
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
            <AppProviders>
              <App />
            </AppProviders>
          </NotificationsProvider>
        </MyQuestionsProvider>
      </BookmarksProvider>
    </AuthProvider>
  </BrowserRouter>
)
