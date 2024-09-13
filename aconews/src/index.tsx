import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' in React 18 for root rendering
import "./styles/tailwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Ensure the element exists and cast it to `HTMLElement` for TypeScript type-safety
const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure performance
reportWebVitals();
