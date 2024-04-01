import ReactDOM from "react-dom/client";
import React from "react";
import "./style.css";
import { ContextProvider } from "./store/context";
import ModelSection from "./components/ModelSection";
import TextSection from "./components/TextSection";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <ContextProvider>
    <ModelSection />
    <TextSection />
  </ContextProvider>
);
