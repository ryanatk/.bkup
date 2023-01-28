const TABBING = {
  CACHED_ATTR: 'data-original-tabindex',
  ATTR: 'tabindex',
};

const VISIBILITY = {
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

interface Selectors {
  visibility: string;
  tabbing: string;
}

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  selectors: Selectors,
): void => {
  (isVisible: boolean) => {
    [TABBING, VISIBILITY].forEach(({ elements, ...config }) => {
      elements.forEach((element) => {
        // toggleElement(element);
      });
    });
  };
};

export default setupToggleOutsideElements;
