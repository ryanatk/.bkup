const setupKeydown = (event: KeyboardEvent): void => {
  const { key } = event;

  // Prevent scrolling via arrow keys when moving through nav links
  if (['arrowup', 'arrowdown', 'space', ' '].includes(key.toLowerCase())) {
    event.preventDefault();
  }
};

export default setupKeydown;
