import React from "react";
import { render, screen } from "@testing-library/react";
import RunningCountDrill from "../components/drills/RunningCountDrill";

test("renders Running Count Drill heading", () => {
  render(<RunningCountDrill isRunning={false} deckCount={6} speedMs={600} />);
  expect(screen.getByText(/Running Count Drill/i)).toBeInTheDocument();
});
