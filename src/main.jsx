import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./i18n";
import App from "./App";
import PageLoader from "./components/PageLoader";

const HelpCenter = lazy(() => import("./pages/HelpCenter"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/help-center"
          element={
            <Suspense fallback={<PageLoader />}>
              <HelpCenter />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
