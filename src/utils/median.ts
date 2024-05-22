/**
 * Calculates the median value of an array of numbers.
 *
 * @param values - The array of numbers.
 * @returns The median value of the array.
 * @throws {Error} If the input array is empty.
 */
export function median(values: number[]): number {
  if (values.length === 0) {
    throw new Error("Input array is empty");
  }

  // Sorting values, preventing original array
  // from being mutated.
  values = [...values]
    .filter((v) => typeof v === "number" && !isNaN(v))
    .sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2;
}
