const setupKeydown = (event: KeyboardEvent): void => {
  const { key } = event;

  console.log({ key });

  // Prevent scrolling via arrow keys when moving through nav links
  if (['arrowup', 'arrowdown', 'space'].includes(key.toLowerCase())) {
    event.preventDefault();
  }
};

export default setupKeydown;
