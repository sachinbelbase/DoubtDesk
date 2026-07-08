import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";


function ThemeProvider({ children }) {


     const [darkMode, setDarkMode] = useState(() => {

          const savedTheme = localStorage.getItem("theme");

          return savedTheme === "dark";

     });



     useEffect(() => {

          const html = document.documentElement;


          if (darkMode) {

               html.classList.add("dark");

               localStorage.setItem(
                    "theme",
                    "dark"
               );


          } else {

               html.classList.remove("dark");

               localStorage.setItem(
                    "theme",
                    "light"
               );

          }


     }, [darkMode]);



     const toggleTheme = () => {

          setDarkMode((previousMode) => !previousMode);

     };



     return (

          <ThemeContext.Provider

               value={{
                    darkMode,
                    toggleTheme,
               }}

          >

               {children}

          </ThemeContext.Provider>

     );

}


export default ThemeProvider;