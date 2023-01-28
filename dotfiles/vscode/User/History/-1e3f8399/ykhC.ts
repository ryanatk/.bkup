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
  const { key } = event;
  console.log(key, PREVENTED_KEYS.includes(key.toLowerCase()));

  if (PREVENTED_KEYS.includes(key.toLowerCase())) {
    event.preventDefault();
  }
};

export default preventScrolling;
