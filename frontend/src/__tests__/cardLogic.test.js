import {
  getHiLoValue,
  generateDeck,
  generateShoe,
  applyHiLoRunningCount,
  getTrueCount,
  generateTrueCountScenario,
  clampPenetrationPercent,
  cardsUntilPenetration,
  hasReachedPenetration,
} from "../domain/cardLogic";

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

test("generateShoe multiplies deck size", () => {
  const shoe = generateShoe(3);
  expect(shoe).toHaveLength(3 * 52);
});

test("Hi-Lo count over full deck sums to 0", () => {
  const deck = generateDeck();
  const total = applyHiLoRunningCount(deck);
  expect(total).toBe(0);
});

test("getTrueCount divides running count by decks remaining", () => {
  expect(getTrueCount(8, 2)).toBe(4);
  expect(getTrueCount(-3, 1.5)).toBeCloseTo(-2, 5);
});

test("getTrueCount validates inputs", () => {
  expect(() => getTrueCount(5, 0)).toThrow(/decksRemaining/i);
  expect(() => getTrueCount(5, -1)).toThrow(/decksRemaining/i);
  expect(() => getTrueCount(5, Infinity)).toThrow(/decksRemaining/i);
  expect(() => getTrueCount(NaN, 1)).toThrow(/runningCount/i);
});

test("generateTrueCountScenario uses provided random function for repeatability", () => {
  const deterministicValues = [0.0, 0.95];
  const deterministicRandom = () => {
    const value = deterministicValues.shift();
    return value === undefined ? 0 : value;
  };
  const scenario = generateTrueCountScenario(deterministicRandom);
  expect(scenario).toEqual({ runningCount: -16, decksRemaining: 6 });
});

test("generateTrueCountScenario rejects non-function random arguments", () => {
  expect(() => generateTrueCountScenario(42)).toThrow(/randomFn/i);
});

test("clampPenetrationPercent enforces 50-95 range", () => {
  expect(clampPenetrationPercent(30)).toBe(50);
  expect(clampPenetrationPercent(120)).toBe(95);
  expect(clampPenetrationPercent(80)).toBe(80);
  expect(clampPenetrationPercent(NaN)).toBe(75);
});

test("cardsUntilPenetration computes threshold", () => {
  expect(cardsUntilPenetration(312, 75)).toBe(Math.ceil(312 * 0.75));
  expect(cardsUntilPenetration(0, 75)).toBe(0);
});

test("hasReachedPenetration detects shuffle point", () => {
  expect(hasReachedPenetration(100, 312, 75)).toBe(false);
  expect(hasReachedPenetration(250, 312, 75)).toBe(true);
  expect(hasReachedPenetration(1, 0, 75)).toBe(true);
});
