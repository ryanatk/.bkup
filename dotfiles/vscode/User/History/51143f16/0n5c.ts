interface Config {
  SELECTOR: string;
  ATTR: string;
  VALUE: string;
}

const TABBING: Config = {
  SELECTOR: 'tabbing',
  ATTR: 'tabindex',
  VALUE: '-1',
};

const VISIBILITY: Config = {
  SELECTOR: 'visibility',
  ATTR: 'aria-hidden',
  VALUE: 'true',
};

interface Selector {
  visibility: string;
  tabbing: string;
}

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  selector: Selector,
) => {
  const toggleElement = (element, isVisible: boolean, ATTR, VALUE) => {
    const CACHED_ATTR = `data-original-${ATTR}`;
    if (
      !element?.contains(menu) && // not a parent
      !menu?.contains(element) && // not a child
      element !== menuTrigger // not the trigger
    ) {
      if (isVisible) {
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
    [TABBING, VISIBILITY].forEach(({ SELECTOR, ATTR, VALUE }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        selector[SELECTOR],
      );

      elements.forEach((element) => {
        toggleElement(element, isVisible, ATTR, VALUE);
      });
    });
  };
};

export default setupToggleOutsideElements;
