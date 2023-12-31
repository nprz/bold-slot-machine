export function getReward(symbols: string[][]) {
  const itemDict = symbols.reduce(
    (acc: { [key: string]: number }, cur: string[]) => {
      const lastItem = cur[cur.length - 1];

      if (acc[lastItem]) {
        acc[lastItem] = acc[lastItem] + 1;
      } else {
        acc[lastItem] = 1;
      }

      return acc;
    },
    {}
  );

  const itemCount = Object.values(itemDict);

  return itemCount.length === 1 ? 150 : itemCount.length === 2 ? 25 : 0;
}
