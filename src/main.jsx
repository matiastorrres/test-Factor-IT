import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { InfoProvider } from "./context/InfoContext.jsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InfoProvider>
        <App />
      </InfoProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
