export const clamp = (min: number, max: number) => (x: number) =>
  Math.max(min, Math.min(x, max));
