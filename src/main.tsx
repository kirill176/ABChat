import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { HashRouter } from "react-router-dom";

const root = document.getElementById("root");

if (root instanceof HTMLElement) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
