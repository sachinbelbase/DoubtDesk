import { AuthProvider } from "./AuthContext";
import { BookmarksProvider } from "./BookmarksContext";
import { MyQuestionsProvider } from "./MyQuestionsContext";
import { NotificationsProvider } from "./NotificationsContext";
import { AnswersProvider } from "./AnswersContext";

function AppProviders({ children }) {
     return (
          <AuthProvider>
               <BookmarksProvider>
                    <MyQuestionsProvider>
                         <NotificationsProvider>
                              <AnswersProvider>
                                   {children}
                              </AnswersProvider>
                         </NotificationsProvider>
                    </MyQuestionsProvider>
               </BookmarksProvider>
          </AuthProvider>
     );
}

export default AppProviders;
