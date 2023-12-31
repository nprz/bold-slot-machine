import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SpinButton } from ".";

test("fires onClick function upon being pressed", () => {
  const mockHandleSpin = jest.fn();

  render(
    <SpinButton title="SPIN" handleSpin={mockHandleSpin} spinning={false} />
  );
  const button = screen.getByText(/SPIN/i);
  fireEvent.click(button);
  expect(mockHandleSpin).toHaveBeenCalled();
});

test("does not fire onClick function upon being pressed when spinning", () => {
  const mockHandleSpin = jest.fn();

  render(
    <SpinButton title="SPIN" handleSpin={mockHandleSpin} spinning={true} />
  );
  const button = screen.getByText(/SPIN/i);
  fireEvent.click(button);
  expect(mockHandleSpin).toBeCalledTimes(0);
});
