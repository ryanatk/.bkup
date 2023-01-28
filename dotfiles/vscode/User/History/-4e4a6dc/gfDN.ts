/**
 *  Prevent scrolling via arrow keys when moving through nav links
 */

const onKeydown = (event: KeyboardEvent): void => {
  const { key } = event;

  if (['arrowup', 'arrowdown', 'space', ' '].includes(key.toLowerCase())) {
    event.preventDefault();
  }
};

export default onKeydown;
