import React, { useCallback, useEffect, useState } from "react";
import { getTrueCount, generateTrueCountScenario } from "../../domain/cardLogic";

// TODO: Track accuracy, response time, and ramp difficulty dynamically.

function TrueCountDrill({ isRunning }) {
  const [scenario, setScenario] = useState({ runningCount: 0, decksRemaining: 1 });
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [awaitingNext, setAwaitingNext] = useState(false);

  const setupScenario = useCallback(() => {
    setScenario(generateTrueCountScenario());
    setInput("");
    setFeedback("");
    setAwaitingNext(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      setupScenario();
    } else {
      setInput("");
      setFeedback("");
      setAwaitingNext(false);
    }
  }, [isRunning, setupScenario]);

  if (!isRunning) {
    return <p>Start the drill to begin true count practice.</p>;
  }

  const { runningCount, decksRemaining } = scenario;
  const correctTrueCount = getTrueCount(runningCount, decksRemaining);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (awaitingNext) return;
    const userVal = Number(input);
    const diff = Math.abs(userVal - correctTrueCount);
    setFeedback(
      `You said ${userVal.toFixed(2)}, correct was ${correctTrueCount.toFixed(
        2
      )} (error: ${diff.toFixed(2)}).`
    );
    setAwaitingNext(true);
  };

  return (
    <div>
      <h3>True Count Drill</h3>
      <p>Running count: {runningCount}</p>
      <p>Decks remaining: {decksRemaining.toFixed(2)}</p>

      <form onSubmit={handleSubmit}>
        <label>
          True count:
          <input
            type="number"
            step="0.5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={awaitingNext}
            required
          />
        </label>
        <button type="submit" disabled={awaitingNext}>
          Submit
        </button>
      </form>

      {feedback && (
        <>
          <p>{feedback}</p>
          <button type="button" onClick={setupScenario}>
            Next scenario
          </button>
        </>
      )}
    </div>
  );
}

export default TrueCountDrill;
