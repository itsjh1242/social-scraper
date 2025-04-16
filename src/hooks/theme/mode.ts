/**
 * @description check if the user prefers dark mode
 */
export const applySavedTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.setAttribute("data-theme", "light");
  }
};
/**
 * @description change to light mode
 */
export const setLightMode = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  document.documentElement.setAttribute("data-theme", "light");
};
/**
 * @description change to dark mode
 */
export const setDarkMode = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  document.documentElement.setAttribute("data-theme", "dark");
};
