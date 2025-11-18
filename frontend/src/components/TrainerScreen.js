import React, { useState } from "react";
import RunningCountDrill from "./drills/RunningCountDrill";
import TrueCountDrill from "./drills/TrueCountDrill";

function TrainerScreen() {
  const [drillType, setDrillType] = useState("running-count");
  const [deckCount, setDeckCount] = useState(6);
  const [speedMs, setSpeedMs] = useState(600);
  const [isRunning, setIsRunning] = useState(false);

  const startDrill = () => setIsRunning(true);
  const stopDrill = () => setIsRunning(false);

  return (
    <div>
      <section style={{ marginBottom: "1rem" }}>
        <h2>Trainer Settings</h2>

        <div>
          <label>
            Drill type:
            <select
              value={drillType}
              onChange={(e) => setDrillType(e.target.value)}
            >
              <option value="running-count">Running Count</option>
              <option value="true-count">True Count</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Decks:
            <select
              value={deckCount}
              onChange={(e) => setDeckCount(Number(e.target.value))}
            >
              {[1, 2, 4, 6, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Speed:
            <select
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
            >
              <option value={800}>Slow</option>
              <option value={600}>Medium</option>
              <option value={400}>Fast</option>
            </select>
          </label>
        </div>

        <button onClick={isRunning ? stopDrill : startDrill}>
          {isRunning ? "Stop Drill" : "Start Drill"}
        </button>
      </section>

      <section>
        {drillType === "running-count" ? (
          <RunningCountDrill
            isRunning={isRunning}
            deckCount={deckCount}
            speedMs={speedMs}
          />
        ) : (
          <TrueCountDrill isRunning={isRunning} />
        )}
      </section>
    </div>
  );
}

export default TrainerScreen;
