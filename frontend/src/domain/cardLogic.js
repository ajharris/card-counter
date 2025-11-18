// Simple Hi-Lo implementation and shoe generation.

// Card ranks & suits
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const SUITS = ["♠", "♥", "♦", "♣"];

// Hi-Lo values: 2–6 = +1, 7–9 = 0, 10–A = -1
export function getHiLoValue(rank) {
  if (["2", "3", "4", "5", "6"].includes(rank)) return 1;
  if (["7", "8", "9"].includes(rank)) return 0;
  return -1; // 10, J, Q, K, A
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
