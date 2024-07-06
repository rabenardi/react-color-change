import React from "react";
import ReactDOM from "react-dom/client";
import Content from "./content.jsx";
import Title from "./title.jsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Title />
    <Content />
  </React.StrictMode>
);
