import React, { useContext, createContext, useState } from "react";
import * as THREE from "three";
import { suzanneDescriptions, sceneButtonsArray } from "../components/utils";

interface ObjectButtons {
  [key: string]: number[][];
}

const Context = createContext({
  buttonValue: 0,
  setButtonValue: (value: number) => {},
  handleClick: (index: number) => {},
  storedPosition: null as THREE.Vector3 | null,
  setStoredPosition: (position: THREE.Vector3 | null) => {},
  objectButtons: undefined as ObjectButtons | undefined,
});

export const ContextProvider = ({ children }) => {
  const [buttonValue, setButtonValue] = useState<number>(0);
  const [storedPosition, setStoredPosition] = useState<THREE.Vector3 | null>(
    null
  );

  let buttonName = "";
  const modelNameButtons = Object.keys(sceneButtonsArray[0])[0];
  const objectButtons = sceneButtonsArray.find((buttonsObj) => {
    const [key] = Object.keys(buttonsObj);
    return key === modelNameButtons;
  });

  if (objectButtons) {
    buttonName = Object.keys(objectButtons)[0];
  }

  const handleClick = (index: number) => {
    if (index > suzanneDescriptions.length - 1 || index < 0) {
      return;
    }
    if (objectButtons) {
      const position = objectButtons[buttonName][index];
      const newPosition = {
        x: position[0],
        y: position[1],
        z: position[2],
      };

      setStoredPosition(newPosition as THREE.Vector3);
      setButtonValue(index);
    }
  };

  return (
    <Context.Provider
      value={{
        buttonValue,
        setButtonValue,
        handleClick,
        storedPosition,
        setStoredPosition,
        objectButtons,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
