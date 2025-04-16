// react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// route
import AppRoutes from "@/routes";
// style
import "@/style/app.css";
import { applySavedTheme } from "./hooks/theme/mode";

const basename = import.meta.env.VITE_BROWSER_ROUTER_BASE_NAME || "/";

/**
 * @description check if the user prefers dark mode
 */
applySavedTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
