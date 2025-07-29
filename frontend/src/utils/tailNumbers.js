export const TAIL_NUMBERS = [
  ...Array.from({ length: 63 }, (_, i) => `A320-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `A330-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `A350-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `B737-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `B777-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `B787-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `E190-${(i + 1).toString().padStart(3, '0')}`),
  ...Array.from({ length: 63 }, (_, i) => `E195-${(i + 1).toString().padStart(3, '0')}`)
].slice(0, 501);