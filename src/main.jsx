// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./components/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {/* ✅ Add this */}
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
    {/* ✅ Close it here */}
  </StrictMode>
);
 