/**
 * Returns an array of randomly selected elements from the input array while preserving their original order.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array.
 * @param {number} n - The number of elements to select.
 * @returns {T[]} - An array of randomly selected elements in their original order.
 */
export const getRandomElementsInOrder = <T>(array: T[], n: number): T[] => {
  if (n <= 0) {
    return [];
  }

  // Create an array of indices [0, 1, ..., array.length - 1]
  const indices = Array.from(array.keys());

  // Shuffle the array of indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Sort the first `n` indices to preserve the original order
  const selectedIndices = indices.slice(0, n).sort((a, b) => a - b);

  // Map the sorted indices to their corresponding elements in the original array
  return selectedIndices.map((index) => array[index]);
};
