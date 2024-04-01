import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { suzanneDescriptions } from "./utils";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF, OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useStateContext } from "../store/context";
import React, { useState, useRef, Suspense } from "react";
import { NumberButton } from "./style";

interface GLTFModel extends GLTF {
  position?: THREE.Vector3;
}

const Model = () => {
  const { storedPosition, setStoredPosition, handleClick, objectButtons } =
    useStateContext();

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const objectRef = useRef<GLTFModel | null>(null);
  const fox = useGLTF("./Suzanne/glTF/Suzanne.gltf");

  let buttonName = "";

  if (objectButtons) {
    buttonName = Object.keys(objectButtons)[0];
  }

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    if (storedPosition) {
      const objectPosition = objectRef.current?.position as THREE.Vector3;

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(storedPosition);

      cameraPosition.x < 0
        ? (cameraPosition.x += 0.02)
        : (cameraPosition.x -= 0.02);

      if (smoothedCameraPosition) {
        smoothedCameraPosition.lerp(cameraPosition, 3 * delta);
      }

      if (smoothedCameraTarget) {
        smoothedCameraTarget.lerp(objectPosition, 3 * delta);
      }

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      if (
        state.camera.position.distanceTo(cameraPosition) < 0.02 &&
        controlsRef.current
      ) {
        controlsRef.current.enabled = true;
        setStoredPosition(null);
      }
    }
  });

  return (
    <>
      <OrbitControls makeDefault ref={controlsRef} />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      {suzanneDescriptions.map((_item, index) => (
        <Html
          distanceFactor={6}
          center
          key={index}
          className="wrapper"
          position={
            objectButtons &&
            (objectButtons[buttonName][index] as [number, number, number])
          }
        >
          <NumberButton onClick={() => handleClick(index)}>{`${
            index + 1
          }`}</NumberButton>
        </Html>
      ))}

      <Suspense>
        <primitive
          ref={objectRef}
          object={fox.scene}
          scale={0.5}
          position={[0, 0, 0]}
        />
      </Suspense>
    </>
  );
};

export default Model;
