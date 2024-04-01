import React, { Suspense, lazy } from "react";
import { ModelWrapper } from "./style";
import { Canvas } from "@react-three/fiber";

const LazyModel = lazy(() => import("./Model"));

const ModelSection = () => {
  return (
    <ModelWrapper>
      <Suspense>
        <Canvas>
          <LazyModel />
        </Canvas>
      </Suspense>
    </ModelWrapper>
  );
};

export default ModelSection;
