const toggleOutsideElementsTabbing = (visible: boolean, menu, menuTrigger) => {
  console.log({ visible, menu, menuTrigger });
  const focusableElements = document.body.querySelectorAll<HTMLElement>(
    'a[href], button, input, textarea, select, details, iframe, [tabindex]:not([tabindex="-1"])',
  );

  focusableElements.forEach((element) => {
    if (
      !element?.contains(menu) && // not a parent
      !menu?.contains(element) && // not a child
      element !== menuTrigger // not the trigger
    ) {
      if (visible) {
        // Reset tabindex to original value when re-enabling the elements
        if (element.hasAttribute('data-original-tabindex')) {
          element.setAttribute(
            'tabindex',
            element.getAttribute('data-original-tabindex'),
          );
        } else {
          element.removeAttribute('tabindex');
        }
      } else {
        // Cache initial tabindex value of element to reset when re-enabling elements
        if (element.hasAttribute('tabindex')) {
          element.setAttribute(
            'data-original-tabindex',
            element.getAttribute('tabindex'),
          );
        }
        element.setAttribute('tabindex', '-1');
      }
    }
  });
};

export default toggleOutsideElementsTabbing;
