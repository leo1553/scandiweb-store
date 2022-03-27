export function createArray<T>(size: number, mapper: (index: number, array: 0[]) => T) {
  return new Array(size).fill(0).map((_, index, array) => mapper(index, array));
}
