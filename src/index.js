
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

console.log(`backend Url: ${process.env.REACT_APP_BACKEND_URL}`)