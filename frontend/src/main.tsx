import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import store from "./store/store";
import ThemeWrapper from "./ThemeWrapper";
import GenerateAlert from "./components/GenerateAlert";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <GenerateAlert />
        <RouterProvider router={router} />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
