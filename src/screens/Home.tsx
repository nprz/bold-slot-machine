import React from "react";
import styled, { keyframes } from "styled-components";
import { SlotMachine } from "../components/SlotMachine";

const backgroundGradient = keyframes`
  from {
    background-color: #e66465
  }

  to {
    background-color: #9198e5
  }
`;

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation-name: ${backgroundGradient};
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

export function Home() {
  return (
    <Screen>
      <SlotMachine />
    </Screen>
  );
}
