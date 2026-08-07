import { AuthProvider } from "./AuthContext";
import { NotificationsProvider } from "./NotificationsContext";
import { ThemeProvider } from "./ThemeContext";

function AppProviders({ children }) {
     return (
          <ThemeProvider>
               <AuthProvider>
                    <NotificationsProvider>
                         {children}
                    </NotificationsProvider>
               </AuthProvider>
          </ThemeProvider>
     );
}

export default AppProviders;