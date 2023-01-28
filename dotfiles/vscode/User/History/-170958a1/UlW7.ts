const CACHED = 'data-original-aria-hidden';

const toggleOutsideElementsVisibility = (
  visible: boolean,
  menu: HTMLElement,
  menuTrigger: HTMLElement,
): void => {
  const allElements = document.body.querySelectorAll<HTMLElement>('*');

  allElements.forEach((element) => {
    if (
      !element?.contains(menu) &&
      !menu?.contains(element) &&
      element !== menuTrigger
    ) {
      if (visible) {
        // Reset aria-hidden to original value when re-enabling the elements
        if (element.hasAttribute(CACHED)) {
          element.setAttribute('aria-hidden', element.getAttribute(CACHED));
        } else {
          element.removeAttribute('aria-hidden');
        }
      } else {
        // Cache initial aria-hidden value of element to reset when re-enabling elements
        if (element.hasAttribute('aria-hidden')) {
          element.setAttribute(CACHED, element.getAttribute('aria-hidden'));
        }
        element.setAttribute('aria-hidden', 'true');
      }
    }
  });
};

export default toggleOutsideElementsVisibility;
