import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";
import dotenv from "dotenv";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


i18next.init({
  interpolation: {escapeValue: false},
  lng: "es",
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1ik4n80w.us.auth0.com"
      clientId="5xiJ8pQnMvXFB8qEhaTcr1SwqU178xI0"
      redirectUri={window.location.origin}
      audience="https://ecommerce7"
    >
      <Provider store={store}>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
