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

const preventScrolling = ({ key, preventDefault }: KeyboardEvent): void => {
  if (PREVENTED_KEYS.includes(key.toLowerCase())) {
    preventDefault();
  }
};

export default preventScrolling;
