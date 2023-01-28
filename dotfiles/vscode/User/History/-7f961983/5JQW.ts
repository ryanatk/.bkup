const setupKeydown = (event: KeyboardEvent, condition: boolean): void => {
  const { key } = event;

  if (condition) {
    // Prevent scrolling via arrow keys when moving through nav links
    if (['arrowup', 'arrowdown', 'space'].includes(key.toLowerCase())) {
      event.preventDefault();
    }
  }
};

export default setupKeydown;
