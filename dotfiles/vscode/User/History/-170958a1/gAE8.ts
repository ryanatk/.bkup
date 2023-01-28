const toggleOutsideElementsVisibility = (
  visible: boolean,
  menu,
  menuTrigger,
) => {
  const allElements = document.body.querySelectorAll<HTMLElement>('*');

  allElements.forEach((element) => {
    if (
      !element.contains(menu) &&
      !menu.contains(element) &&
      element !== menuTrigger
    ) {
      if (visible) {
        // Reset aria-hidden to original value when re-enabling the elements
        if (element.hasAttribute('data-original-aria-hidden')) {
          element.setAttribute(
            'aria-hidden',
            element.getAttribute('data-original-aria-hidden'),
          );
        } else {
          element.removeAttribute('aria-hidden');
        }
      } else {
        // Cache initial aria-hidden value of element to reset when re-enabling elements
        if (element.hasAttribute('aria-hidden')) {
          element.setAttribute(
            'data-original-aria-hidden',
            element.getAttribute('aria-hidden'),
          );
        }
        element.setAttribute('aria-hidden', 'true');
      }
    }
  });
};

export default toggleOutsideElementsVisibility;
