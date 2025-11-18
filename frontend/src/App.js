import React from "react";
import TrainerScreen from "./components/TrainerScreen";

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1rem" }}>
      <h1>Card Counting Trainer</h1>
      <TrainerScreen />
    </div>
  );
}

export default App;
