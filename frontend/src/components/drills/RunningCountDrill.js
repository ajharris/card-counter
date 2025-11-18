import React, { useEffect, useState, useRef } from "react";
import { generateShoe, getHiLoValue } from "../../domain/cardLogic";

function RunningCountDrill({ isRunning, deckCount, speedMs }) {
  const [shoe, setShoe] = useState([]);
  const [index, setIndex] = useState(0);
  const [runningCount, setRunningCount] = useState(0);
  const [checkpointInput, setCheckpointInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const timerRef = useRef(null);

  // Initialize shoe when drill starts
  useEffect(() => {
    if (isRunning) {
      setShoe(generateShoe(deckCount));
      setIndex(0);
      setRunningCount(0);
      setFeedback("");
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRunning, deckCount]);

  // Deal cards at interval
  useEffect(() => {
    if (!isRunning || shoe.length === 0) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= shoe.length) {
          clearInterval(timerRef.current);
          return prev;
        }

        const nextCard = shoe[nextIndex];
        setRunningCount((count) => count + getHiLoValue(nextCard.rank));

        // Simple checkpoint every 10 cards
        if (nextIndex > 0 && nextIndex % 10 === 0) {
          // TODO: Make checkpoint frequency configurable.
          clearInterval(timerRef.current);
          setFeedback("Checkpoint reached. Enter your running count.");
        }

        return nextIndex;
      });
    }, speedMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, shoe, speedMs]);

  const currentCard = shoe[index] || null;

  const handleCheckpointSubmit = (e) => {
    e.preventDefault();
    const userVal = Number(checkpointInput);
    const correct = runningCount;

    const diff = Math.abs(userVal - correct);
    setFeedback(
      `You said ${userVal >= 0 ? "+" + userVal : userVal}, correct was ${
        correct >= 0 ? "+" + correct : correct
      } (error: ${diff}).`
    );
    setCheckpointInput("");

    // Resume dealing
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= shoe.length) {
          clearInterval(timerRef.current);
          return prev;
        }

        const nextCard = shoe[nextIndex];
        setRunningCount((count) => count + getHiLoValue(nextCard.rank));
        return nextIndex;
      });
    }, speedMs);
  };

  return (
    <div>
      <h3>Running Count Drill</h3>
      {currentCard ? (
        <div style={{ fontSize: "3rem", margin: "1rem 0" }}>
          {currentCard.rank}
          <span style={{ marginLeft: "0.25rem" }}>{currentCard.suit}</span>
        </div>
      ) : (
        <p>{isRunning ? "Preparing shoe..." : "Start the drill to begin."}</p>
      )}

      {/* In V1 we do not show runningCount; this stays hidden intentionally. */}
      {/* TODO: Add optional "show running count" for learning mode vs test mode. */}

      {feedback && <p>{feedback}</p>}

      {feedback.startsWith("Checkpoint") && (
        <form onSubmit={handleCheckpointSubmit}>
          <label>
            Running count:
            <input
              type="number"
              value={checkpointInput}
              onChange={(e) => setCheckpointInput(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default RunningCountDrill;
