import React from "react";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import { foxDescriptions } from "./utils";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF, OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useState, useRef } from "react";
import { sceneButtonsArray } from "./utils";

interface GLTFModel extends GLTF {
  position?: THREE.Vector3;
}

export default function Scene() {
  const [storedPosition, setStoredPosition] = useState<THREE.Vector3 | null>(
    null
  );

  const [sceneButton, setSceneButton] = useState<number>(0);
  const animalName = "fox";
  const modelNameButtons = animalName + "Buttons";
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const objectRef = useRef<GLTFModel | null>(null);

  let buttonName = "";
  const objectButtons = sceneButtonsArray.find((buttonsObj) => {
    const [key] = Object.keys(buttonsObj);
    return key === modelNameButtons;
  });

  if (objectButtons) {
    buttonName = Object.keys(objectButtons)[0];
  }

  const fox = useGLTF("./Fox/glTF/Fox.gltf");

  const handleClick = (index: number) => {
    if (objectButtons) {
      const position = objectButtons[buttonName][index];
      const newPosition = {
        x: position[0],
        y: position[1],
        z: position[2],
      };

      setStoredPosition(newPosition as THREE.Vector3);

      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
      setSceneButton(index + 1);

      console.log(position);
      console.log(index + 1);
    }
  };

  console.log(foxDescriptions);
  const modalTitle = foxDescriptions.map((item) => {
    return (
      <div key={item[sceneButton]}>
        <h2>{item[sceneButton]}</h2>
        <p>{item[sceneButton + 1]}</p>
      </div>
    );
  });

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    if (storedPosition) {
      const objectPosition = objectRef.current?.position as THREE.Vector3;

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(storedPosition);

      console.log(cameraPosition);

      // cameraPosition.x < 0
      //   ? (cameraPosition.x += 0.02)
      //   : (cameraPosition.x -= 0.02);

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
      <Perf position="top-left" />

      <OrbitControls makeDefault ref={controlsRef} />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      <Html center className="wrapper">
        <div className="descriptions">{modalTitle}</div>
      </Html>

      {foxDescriptions.map((_item, index) => (
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
          {/* <div className='descriptions'>{modalTitle}</div> */}
          <button onClick={() => handleClick(index)}>{`${index + 1}`}</button>
        </Html>
      ))}

      <Suspense>
        <primitive
          ref={objectRef}
          object={fox.scene}
          scale={0.02}
          position={[0, -1, 0]}
        />
      </Suspense>

      <Html></Html>
    </>
  );
}
