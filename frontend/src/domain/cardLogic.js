// Simple Hi-Lo implementation and shoe generation.

// Card ranks & suits
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const SUITS = ["♠", "♥", "♦", "♣"];
const MIN_PENETRATION_PERCENT = 50;
const MAX_PENETRATION_PERCENT = 95;
const DEFAULT_PENETRATION_PERCENT = 75;
const TRUE_COUNT_RUNNING_COUNT_CHOICES = [
  -16,
  -14,
  -12,
  -10,
  -8,
  -6,
  -4,
  -2,
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
];
const TRUE_COUNT_DECKS_REMAINING_CHOICES = [
  0.5,
  0.75,
  1,
  1.5,
  2,
  2.5,
  3,
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
];

// Hi-Lo values: 2–6 = +1, 7–9 = 0, 10–A = -1
export function getHiLoValue(rank) {
  if (["2", "3", "4", "5", "6"].includes(rank)) return 1;
  if (["7", "8", "9"].includes(rank)) return 0;
  return -1; // 10, J, Q, K, A
}

export function getTrueCount(runningCount, decksRemaining) {
  if (!Number.isFinite(runningCount)) {
    throw new Error("runningCount must be a finite number");
  }
  if (!Number.isFinite(decksRemaining) || decksRemaining <= 0) {
    throw new Error("decksRemaining must be a finite number greater than 0");
  }
  return runningCount / decksRemaining;
}

export function clampPenetrationPercent(percent = DEFAULT_PENETRATION_PERCENT) {
  if (!Number.isFinite(percent)) {
    return DEFAULT_PENETRATION_PERCENT;
  }
  return Math.min(Math.max(percent, MIN_PENETRATION_PERCENT), MAX_PENETRATION_PERCENT);
}

export function cardsUntilPenetration(shoeSize, penetrationPercent) {
  if (shoeSize <= 0) return 0;
  const normalizedPercent = clampPenetrationPercent(penetrationPercent);
  return Math.ceil((normalizedPercent / 100) * shoeSize);
}

export function hasReachedPenetration(cardsDealt, shoeSize, penetrationPercent) {
  if (shoeSize <= 0) return true;
  return cardsDealt >= cardsUntilPenetration(shoeSize, penetrationPercent);
}

function pickRandomChoice(choices, randomFn) {
  const index = Math.floor(randomFn() * choices.length);
  return choices[Math.min(index, choices.length - 1)];
}

export function generateTrueCountScenario(randomFn = Math.random) {
  if (typeof randomFn !== "function") {
    throw new Error("randomFn must be a function");
  }
  const runningCount = pickRandomChoice(TRUE_COUNT_RUNNING_COUNT_CHOICES, randomFn);
  const decksRemaining = pickRandomChoice(TRUE_COUNT_DECKS_REMAINING_CHOICES, randomFn);
  return { runningCount, decksRemaining };
}

// Generate a single standard deck
export function generateDeck() {
  const deck = [];
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

// Generate a shoe with N decks and shuffle it
export function generateShoe(deckCount = 6) {
  let shoe = [];
  for (let i = 0; i < deckCount; i += 1) {
    shoe = shoe.concat(generateDeck());
  }
  return shuffle(shoe);
}

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function applyHiLoRunningCount(cards) {
  // Reduce card sequence to a running count
  return cards.reduce((count, card) => count + getHiLoValue(card.rank), 0);
}

// TODO: Add support for other systems (e.g., KO, Omega II) in future versions.
