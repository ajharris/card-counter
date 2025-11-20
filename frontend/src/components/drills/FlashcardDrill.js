import React, { useCallback, useEffect, useRef, useState } from "react";
import { generateShoe, getHiLoValue } from "../../domain/cardLogic";

const CLASSIFICATION_OPTIONS = [
  { label: "+1", value: 1 },
  { label: "0", value: 0 },
  { label: "-1", value: -1 },
];

function FlashcardDrill({ isRunning, speedMs, deckCount = 6 }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, correct: 0 });
  const shoeRef = useRef([]);
  const indexRef = useRef(-1);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const prepareShoe = useCallback(() => {
    shoeRef.current = generateShoe(deckCount);
    indexRef.current = -1;
  }, [deckCount]);

  const dealNextCard = useCallback(() => {
    if (shoeRef.current.length === 0 || indexRef.current >= shoeRef.current.length - 1) {
      prepareShoe();
    }
    indexRef.current += 1;
    const nextCard = shoeRef.current[indexRef.current];
    setCurrentCard(nextCard);
    setHasAnswered(false);
    setFeedback("");
  }, [prepareShoe]);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      setCurrentCard(null);
      setFeedback("");
      setStats({ attempts: 0, correct: 0 });
      return;
    }

    prepareShoe();
    setStats({ attempts: 0, correct: 0 });
    dealNextCard();
  }, [clearTimer, dealNextCard, isRunning, prepareShoe]);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return undefined;
    }

    clearTimer();
    timerRef.current = setInterval(() => {
      dealNextCard();
    }, speedMs);

    return () => {
      clearTimer();
    };
  }, [clearTimer, dealNextCard, isRunning, speedMs]);

  const handleClassification = (value) => {
    if (!isRunning || !currentCard || hasAnswered) return;
    const actual = getHiLoValue(currentCard.rank);
    const correctGuess = actual === value;
    setStats((prev) => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + (correctGuess ? 1 : 0),
    }));
    setFeedback(
      correctGuess
        ? "Correct!"
        : `Incorrect. ${currentCard.rank} counts as ${actual > 0 ? "+1" : actual === 0 ? "0" : "-1"}.`
    );
    setHasAnswered(true);
  };

  const accuracyPercent = stats.attempts
    ? Math.round((stats.correct / stats.attempts) * 100)
    : null;

  if (!isRunning) {
    return <p>Start the drill to enter flashcard mode.</p>;
  }

  return (
    <div>
      <h3>Flashcard Drill</h3>
      {currentCard ? (
        <div style={{ fontSize: "3rem", margin: "1rem 0" }}>
          {currentCard.rank}
          <span style={{ marginLeft: "0.25rem" }}>{currentCard.suit}</span>
        </div>
      ) : (
        <p>Preparing cards...</p>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {CLASSIFICATION_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleClassification(option.value)}
            disabled={!currentCard || hasAnswered}
          >
            {option.label}
          </button>
        ))}
      </div>

      {feedback && <p>{feedback}</p>}

      <p>
        Attempts: {stats.attempts} | Correct: {stats.correct}
        {" "}
        {accuracyPercent !== null && `| Accuracy: ${accuracyPercent}%`}
      </p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Cards advance automatically every {speedMs} ms. Answering locks in your response until the next
        card appears.
      </p>
    </div>
  );
}

export default FlashcardDrill;
