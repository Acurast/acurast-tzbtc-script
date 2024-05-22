import { deepEqual } from "./deepEqual";

/**
 * Compares elements in an array and returns the one with the most equals.
 *
 * @param array - An array of elements.
 * @returns The index and value of the most frequent occurance.
 */

export function compareElements(array: any[]) {
  const map = new Map<number, number>();

  // We compare all the elements with each other and count how many times each element is equal to another
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (deepEqual(array[i], array[j])) {
        map.set(i, (map.get(i) || 1) + 1);
      }
    }
  }

  let maxKey: number = -1;
  let maxValue: number = -1;

  // We select the element with the most matches
  Array.from(map).forEach(([key, value]) => {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  });

  return { maxKey, maxValue };
}
