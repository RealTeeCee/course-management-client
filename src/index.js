import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./assets/css/font-awesome.css";
import "./assets/css/vendors/icofont.css";
import "./assets/css/vendors/themify.css";
import "./assets/css/vendors/flag-icon.css";
import "./assets/css/vendors/feather-icon.css";
import "./assets/css/vendors/scrollbar.css";
import "./assets/css/vendors/animate.css";
import "./assets/css/vendors/chartist.css";
import "./assets/css/vendors/date-picker.css";
import "./assets/css/vendors/bootstrap.css";
import "./assets/css/style.css";
import "./assets/css/color-1.css";
import "./assets/css/responsive.css";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
import "swiper/css";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7366ff",
            },
          }}
        >
          <App />
        </ConfigProvider>

        <ToastContainer
          bodyClassName="font-tw-primary"
          position="top-center"
          autoClose={2000}
        />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
