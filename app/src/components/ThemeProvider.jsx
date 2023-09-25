import { createContext, useContext, useState, useEffect } from "react";

const ThemeProviderContext = createContext();

export const checkDefaultTheme = () => {
  const storedDarkMode = localStorage.getItem("darkTheme");

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeProviderContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useThemeProviderContext = () => useContext(ThemeProviderContext);

export default ThemeProvider;
