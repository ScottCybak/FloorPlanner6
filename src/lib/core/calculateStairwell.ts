export interface CalculateStairwellResponse {
  steps: number;
  rise: number;
  run: number;
  totalRun: number;
  warnings: string[];
}

export const calculateStairwell = (
  totalHeight: number,
  totalRun?: number,
  preferredRise: number = 7,
  preferredRun: number = 10
): CalculateStairwellResponse => {
  if (totalHeight <= 0) {
    throw new Error("Total height must be positive.");
  }

  const warnings: string[] = [];
  let steps: number;
  let rise: number;
  let run: number;

  if (totalRun && totalRun > 0) {
    // Use total run to derive geometry
    const approxSteps = totalHeight / preferredRise;
    steps = Math.round(approxSteps);

    rise = totalHeight / steps;
    run = totalRun / steps;
  } else {
    const approxSteps = totalHeight / preferredRise;
    steps = Math.round(approxSteps);
    rise = totalHeight / steps;
    run = +(25 - 2 * rise).toFixed(2);
  }

  const computedTotalRun = +(run * steps).toFixed(2);
  const maxRise = 7.75;
  const minRun = 10;
  const comfort = +(2 * rise + run).toFixed(2);

  if (rise > maxRise) {
    warnings.push(
      `Rise per step (${rise.toFixed(2)}") exceeds maximum allowed (${maxRise}").`
    );
  }
  if (run < minRun) {
    warnings.push(
      `Run per step (${run.toFixed(2)}") is less than minimum recommended (${minRun}").`
    );
  }
  if (comfort < 24 || comfort > 25.5) {
    warnings.push(
      `Comfort formula (2R + G = ${comfort}") is outside the ideal 24–25.5" range.`
    );
  }

  return {
    steps,
    rise: +rise.toFixed(2),
    run: +run.toFixed(2),
    totalRun: computedTotalRun,
    warnings,
  };
}