import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import global_en from "./translations/en/global.json";
import global_fa from "./translations/fa/global.json";
import global_tr from "./translations/tr/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("lang") || "fa",
  resources: {
    en: {
      global: global_en,
    },
    fa: {
      global: global_fa,
    },
    tr: {
      global: global_tr,
    },
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      retry: false,
      staleTime: 30 * 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
