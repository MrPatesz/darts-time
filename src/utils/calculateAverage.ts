export const calculateAverage = (numbers: Array<number>) =>
    numbers.length && Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
