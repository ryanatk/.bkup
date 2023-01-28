interface Attribute {
  NAME: string;
  VALUE: string;
}

interface Config extends Attribute {
  SELECTOR: string;
}

const TABBING: Config = {
  SELECTOR: 'tabbing',
  NAME: 'tabindex',
  VALUE: '-1',
};

const VISIBILITY: Config = {
  SELECTOR: 'visibility',
  NAME: 'aria-hidden',
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
  const toggleElement = (element, isVisible: boolean, ATTR: Attribute) => {
    const CACHED_ATTR = `data-original-${ATTR.NAME}`;
    if (
      !element?.contains(menu) && // not a parent
      !menu?.contains(element) && // not a child
      element !== menuTrigger // not the trigger
    ) {
      if (isVisible) {
        // Reset tabindex to original value when re-enabling the elements
        if (element.hasAttribute(CACHED_ATTR)) {
          element.setAttribute(ATTR.NAME, element.getAttribute(CACHED_ATTR));
        } else {
          element.removeAttribute(ATTR.NAME);
        }
      } else {
        // Cache initial tabindex value of element to reset when re-enabling elements
        if (element.hasAttribute(ATTR.NAME)) {
          element.setAttribute(CACHED_ATTR, element.getAttribute(ATTR.NAME));
        }
        element.setAttribute(ATTR.NAME, ATTR.VALUE);
      }
    }
  };

  return (isVisible: boolean) => {
    [TABBING, VISIBILITY].forEach(({ SELECTOR, ...ATTR }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        selector[SELECTOR],
      );

      elements.forEach((element) => {
        toggleElement(element, isVisible, ATTR);
      });
    });
  };
};

export default setupToggleOutsideElements;
