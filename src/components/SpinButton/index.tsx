import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ $spinning?: boolean }>`
  height: 50px;
  width: 100%;
  margin-top: 30px;
  border-radius: 50px;
  cursor: pointer;
  background: radial-gradient(circle, #9198e5 0%, #e66465 100%);
  color: white;
  font-weight: bold;
  font-size: 22px;
  border: none;
  opacity: ${(props) => (props.$spinning ? 0.5 : 1)};
`;

type SpinButtonProps = {
  spinning: boolean;
  handleSpin: () => void;
  title: string;
};

export function SpinButton({ spinning, handleSpin, title }: SpinButtonProps) {
  return (
    <StyledButton $spinning={spinning} disabled={spinning} onClick={handleSpin}>
      {title}
    </StyledButton>
  );
}
