import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { generateSymbols } from "../../utils/generateSymbols";
import { SlotMachine } from ".";

jest.mock("../utils/generateSymbols");

test("rewards 150 credits when all 3 symbols match", async () => {
  (generateSymbols as jest.Mock).mockImplementation(() => [
    ["🐙", "🌶", "🎲"],
    ["🐙", "🌶", "🎲"],
    ["🐙", "🌶", "🎲"],
  ]);

  render(<SlotMachine />);
  const button = screen.getByText(/SPIN/i);
  fireEvent.click(button);
  fireEvent.animationEnd(screen.getAllByText("🎲")[0]);
  screen.getByText(/240/i);
});

test("rewards 25 credits when 2 symbols match", async () => {
  (generateSymbols as jest.Mock).mockImplementation(() => [
    ["🐙", "🎲", "🍒"],
    ["🐙", "🌶", "🎲"],
    ["🐙", "🌶", "🎲"],
  ]);

  render(<SlotMachine />);
  const button = screen.getByText(/SPIN/i);
  fireEvent.click(button);
  fireEvent.animationEnd(screen.getAllByText("🍒")[0]);
  screen.getByText(/115/i);
});

test("does not reward any credits when there are no matching symbols", async () => {
  (generateSymbols as jest.Mock).mockImplementation(() => [
    ["🐙", "🎲", "🌶"],
    ["🐙", "🌶", "🎲"],
    ["🎲", "🌶", "🐙"],
  ]);

  render(<SlotMachine />);
  const button = screen.getByText(/SPIN/i);
  fireEvent.click(button);
  fireEvent.animationEnd(screen.getAllByText("🌶")[0]);
  screen.getByText(/90/i);
});
