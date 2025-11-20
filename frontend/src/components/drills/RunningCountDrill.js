import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  generateShoe,
  getHiLoValue,
  hasReachedPenetration,
} from "../../domain/cardLogic";

const CHECKPOINT_INTERVAL = 10;

function RunningCountDrill({ isRunning, deckCount, speedMs, penetrationPercent }) {
  const [shoe, setShoe] = useState([]);
  const [index, setIndex] = useState(-1);
  const indexRef = useRef(-1);
  const [runningCount, setRunningCount] = useState(0);
  const [checkpointInput, setCheckpointInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [shuffleNotice, setShuffleNotice] = useState("");
  const timerRef = useRef(null);
  const pendingShuffleRef = useRef(false);

  // Initialize shoe when drill starts
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetCheckpointState = useCallback(() => {
    setCheckpointInput("");
    setFeedback("");
  }, []);

  const reshuffleShoe = useCallback(
    (reason = "New shoe ready.") => {
      setShoe(generateShoe(deckCount));
      indexRef.current = -1;
      setIndex(-1);
      setRunningCount(0);
      resetCheckpointState();
      pendingShuffleRef.current = false;
      setShuffleNotice(reason);
    },
    [deckCount, resetCheckpointState]
  );

  const advanceCard = useCallback(() => {
    if (pendingShuffleRef.current) {
      pendingShuffleRef.current = false;
      reshuffleShoe("Penetration reached. Shuffling new shoe.");
      return;
    }

    const nextIndex = indexRef.current + 1;
    if (nextIndex >= shoe.length) {
      pendingShuffleRef.current = true;
      return;
    }

    const nextCard = shoe[nextIndex];
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setRunningCount((count) => count + getHiLoValue(nextCard.rank));

    const cardsDealt = nextIndex + 1;
    if (
      !pendingShuffleRef.current &&
      hasReachedPenetration(cardsDealt, shoe.length, penetrationPercent)
    ) {
      pendingShuffleRef.current = true;
    }

    if (cardsDealt % CHECKPOINT_INTERVAL === 0) {
      // TODO: Make checkpoint frequency configurable.
      clearTimer();
      setFeedback("Checkpoint reached. Enter your running count.");
    }
  }, [clearTimer, penetrationPercent, reshuffleShoe, shoe]);

  const startDealing = useCallback(() => {
    if (!isRunning || shoe.length === 0) return;
    if (timerRef.current) clearTimer();
    timerRef.current = setInterval(() => {
      advanceCard();
    }, speedMs);
  }, [advanceCard, clearTimer, isRunning, shoe, speedMs]);

  useEffect(() => {
    if (isRunning) {
      reshuffleShoe("New shoe ready.");
    } else {
      clearTimer();
      indexRef.current = -1;
      setIndex(-1);
      setShuffleNotice("");
    }
    return () => {
      clearTimer();
    };
  }, [clearTimer, isRunning, reshuffleShoe]);

  useEffect(() => {
    startDealing();
    return () => {
      clearTimer();
    };
  }, [clearTimer, startDealing]);

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
    startDealing();
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

      {shuffleNotice && <p>{shuffleNotice}</p>}
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
