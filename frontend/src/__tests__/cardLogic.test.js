import { getHiLoValue, generateDeck, applyHiLoRunningCount } from "../domain/cardLogic";

test("Hi-Lo values match expected mapping", () => {
  expect(getHiLoValue("2")).toBe(1);
  expect(getHiLoValue("5")).toBe(1);
  expect(getHiLoValue("7")).toBe(0);
  expect(getHiLoValue("9")).toBe(0);
  expect(getHiLoValue("10")).toBe(-1);
  expect(getHiLoValue("A")).toBe(-1);
});

test("single deck has 52 cards", () => {
  const deck = generateDeck();
  expect(deck).toHaveLength(52);
});

test("Hi-Lo count over full deck sums to 0", () => {
  const deck = generateDeck();
  const total = applyHiLoRunningCount(deck);
  expect(total).toBe(0);
});
