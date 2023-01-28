/**
 *  Prevent scrolling via arrow keys when moving through nav links
 */

export const PREVENTED_KEYS = ['arrowup', 'arrowdown', 'space', ' '];

const preventScrolling = (event: KeyboardEvent): void => {
  console.log({ event });
  const { key } = event;

  if (PREVENTED_KEYS.includes(key.toLowerCase())) {
    event.preventDefault();
  }
};

export default preventScrolling;
