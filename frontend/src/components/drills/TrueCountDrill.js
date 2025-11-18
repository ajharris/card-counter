import React, { useState } from "react";

// TODO: Use real random scenarios and track accuracy, response time.

function TrueCountDrill({ isRunning }) {
  const [runningCount] = useState(8);
  const [decksRemaining] = useState(2.0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const correctTrueCount = runningCount / decksRemaining;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userVal = Number(input);
    const diff = Math.abs(userVal - correctTrueCount);
    setFeedback(
      `You said ${userVal.toFixed(2)}, correct was ${correctTrueCount.toFixed(
        2
      )} (error: ${diff.toFixed(2)}).`
    );
  };

  if (!isRunning) {
    return <p>Start the drill to begin true count practice.</p>;
  }

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
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default TrueCountDrill;
