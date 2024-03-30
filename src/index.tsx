import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene.jsx";
import { TextSection, ModelSection } from "./style.tsx";
import React from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <ModelSection />
    <Canvas shadows>
      <Scene />
    </Canvas>
    <TextSection />
  </>
);
