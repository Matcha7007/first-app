import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Themes from "./themes";
import App from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </Provider>,
  document.getElementById("root"),
);

