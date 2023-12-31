import React from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
from {
    transform: translateY(0px)
  }

  to {
    transform: translateY(-2900px)
  }
`;

const SpinWheelContainer = styled.div<{ $spinning?: boolean }>`
  display: flex;
  flex-direction: column;
  animation-name: ${(props) => (props.$spinning ? spinAnimation : "")};
  animation-duration: 2s;
  animation-fill-mode: forwards;
`;

const SpinWheelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
`;

type SpinWheelProps = {
  spinning: boolean;
  symbols: string[];
  forwardedRef?: React.RefObject<HTMLDivElement>;
};

export function SpinWheel({ spinning, symbols, forwardedRef }: SpinWheelProps) {
  const testId = forwardedRef ? { "data-testid": "animationDiv" } : {};

  return (
    <SpinWheelContainer $spinning={spinning} ref={forwardedRef} {...testId}>
      {symbols.map((symbol, index) => (
        <SpinWheelItem key={`${index}-${symbol}`}>{symbol}</SpinWheelItem>
      ))}
    </SpinWheelContainer>
  );
}
