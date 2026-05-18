import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";

import { store } from "./app/store";

import { AppProvider } from "./app/providers";

import ErrorBoundary from "./shared/components/ErrorBoundary";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <Provider store={store}>

      <AppProvider>

        <ErrorBoundary>

          <App />

        </ErrorBoundary>

        <ToastContainer />

      </AppProvider>

    </Provider>

  </React.StrictMode>
);