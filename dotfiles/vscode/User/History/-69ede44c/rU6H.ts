const ORIGINAL = 'data-original-tabindex';

const toggleOutsideElementsTabbing = (
  visible: boolean,
  menu: HTMLElement,
  menuTrigger: HTMLElement,
): void => {
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
        if (element.hasAttribute(ORIGINAL)) {
          element.setAttribute('tabindex', element.getAttribute(ORIGINAL));
        } else {
          element.removeAttribute('tabindex');
        }
      } else {
        // Cache initial tabindex value of element to reset when re-enabling elements
        if (element.hasAttribute('tabindex')) {
          element.setAttribute(ORIGINAL, element.getAttribute('tabindex'));
        }
        element.setAttribute('tabindex', '-1');
      }
    }
  });
};

export default toggleOutsideElementsTabbing;
