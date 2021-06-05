import { useState, useEffect } from "react";

const useThemeMode = () => {
  const [themeIsDark, setThemeIsDark] = useState(false);

  const themeModeHandler = () => {
    //to switch theme mode
    if (themeIsDark) {
      localStorage.setItem("theme-mode", "light-mode");
      setThemeIsDark(false);
    } else {
      localStorage.setItem("theme-mode", "dark-mode");
      setThemeIsDark(true);
    }
  };

  useEffect(() => {
    const localThemeMode = localStorage.getItem("theme-mode");

    //check if variable exist in local storage or if mode is dark
    if (localThemeMode == null) {
      localStorage.setItem("theme-mode", "light-mode");
    } else if (localThemeMode === "dark-mode") {
      setThemeIsDark(true);
    }
  }, []);

  return { themeIsDark, themeModeHandler };
};

export default useThemeMode;
