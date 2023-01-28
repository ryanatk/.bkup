const CACHED_ATTR = 'data-original-tabindex';
const ATTR = 'tabindex';

const toggleOutsideElementsTabbing = ({
  visible: boolean,
  menu: HTMLElement,
  menuTrigger: HTMLElement,
}): void => {
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
        if (element.hasAttribute(CACHED_ATTR)) {
          element.setAttribute(ATTR, element.getAttribute(CACHED_ATTR));
        } else {
          element.removeAttribute(ATTR);
        }
      } else {
        // Cache initial tabindex value of element to reset when re-enabling elements
        if (element.hasAttribute(ATTR)) {
          element.setAttribute(CACHED_ATTR, element.getAttribute(ATTR));
        }
        element.setAttribute(ATTR, '-1');
      }
    }
  });
};

export default toggleOutsideElementsTabbing;
