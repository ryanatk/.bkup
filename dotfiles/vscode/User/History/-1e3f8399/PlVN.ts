/**
 *  Prevent scrolling via arrow keys when moving through nav links
 */

export const PREVENTED_KEYS = [
  'up',
  'arrowup',
  'down',
  'arrowdown',
  'space',
  ' ',
];

const preventScrolling = (event): void => {
  if (PREVENTED_KEYS.includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
};

export default preventScrolling;
