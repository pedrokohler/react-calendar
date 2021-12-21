export const getNullArray = (size: number) => new Array(size).fill(null);

export const getSequenceArray = (size: number, base: number) => new Array(size).fill(null).map((_, i) => i + base);