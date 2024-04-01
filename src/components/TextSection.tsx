import React from "react";
import {
  TextWrapper,
  Title,
  Description,
  CursorWrapper,
  CursorButtonLeft,
  CursorButtonRight,
} from "./style";
import { suzanneDescriptions } from "./utils";

import { useStateContext } from "../store/context";

const TextSection = () => {
  const { buttonValue, handleClick } = useStateContext();
  const currentDescription = suzanneDescriptions[buttonValue];

  return (
    <TextWrapper>
      <Title>{currentDescription[0]}</Title>
      <Description>{currentDescription[1]}</Description>
      <CursorWrapper>
        <CursorButtonLeft onClick={() => handleClick(buttonValue - 1)}>
          &lt;
        </CursorButtonLeft>
        <CursorButtonRight onClick={() => handleClick(buttonValue + 1)}>
          &gt;
        </CursorButtonRight>
      </CursorWrapper>
    </TextWrapper>
  );
};

export default TextSection;
