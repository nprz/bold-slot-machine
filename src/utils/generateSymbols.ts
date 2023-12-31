import { randomInt } from "./randomInt";

const symbols = ["🍌", "7️⃣", "🍒", "💣", "🐉", "🐙", "🌶", "🎲"];

export function generateSymbols(
  first?: string,
  second?: string,
  third?: string
) {
  const initArray = Array.from({ length: 3 }, () => Array.from({ length: 30 }));

  return initArray.map((array, index) => {
    return array.map((item, innerIndex) => {
      if (first && index === 0 && innerIndex === 0) {
        return first;
      } else if (second && index === 1 && innerIndex === 0) {
        return second;
      } else if (third && index === 2 && innerIndex === 0) {
        return third;
      }

      return symbols[randomInt(0, 8)];
    });
  });
}
