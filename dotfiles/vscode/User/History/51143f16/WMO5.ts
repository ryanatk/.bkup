const TABBING = {
  CACHED_ATTR: 'data-original-tabindex',
  ATTR: 'tabindex',
  VALUE: '-1',
  SELECTOR: 'tabbing',
};

const VISIBILITY = {
  CACHED_ATTR: 'data-original-aria-hidden',
  ATTR: 'aria-hidden',
  VALUE: 'true',
  SELECTOR: 'visibility',
};

interface Selector {
  visibility: string;
  tabbing: string;
}

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  selector: Selector,
): void => {
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

  return (isVisible: boolean) => {
    [TABBING, VISIBILITY].forEach(({ SELECTOR, ...CONFIG }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        selector[SELECTOR],
      );

      elements.forEach((element) => {
        // toggleElement(element);
      });
    });
  };
};

export default setupToggleOutsideElements;
