const TABBING = {
  elements: document.body.querySelectorAll<HTMLElement>(
    'a[href], button, input, textarea, select, details, iframe, [tabindex]:not([tabindex="-1"])',
  ),
  CACHED_ATTR: 'data-original-tabindex',
  ATTR: 'tabindex',
};

const VISIBILITY = {
  elements: document.body.querySelectorAll<HTMLElement>('*'),
  CACHED_ATTR: 'data-original-aria-hidden',
  ATTR: 'aria-hidden',
};

const toggleElement = (element) => {
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
};

interface ToggleProps {
  visible: boolean;
  menu: HTMLElement;
  menuTrigger: HTMLElement;
}

const toggleOutsideElements = ({
  visible,
  menu,
  menuTrigger,
}: ToggleProps): void => {
  [TABBING, VISIBILITY].forEach(({ elements, CACHED_ATTR, ATTR }) => {
    elements.forEach((element) => {
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
  });
};

export default toggleOutsideElements;
