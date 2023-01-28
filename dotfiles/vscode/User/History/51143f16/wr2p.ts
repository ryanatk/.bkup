interface Attribute {
  NAME: string;
  VALUE: string;
}

interface Config extends Attribute {
  SELECTOR: string;
}

const CONFIGS: Config[] = [
  {
    SELECTOR: 'tabbing',
    NAME: 'tabindex',
    VALUE: '-1',
  },
  {
    SELECTOR: 'visibility',
    NAME: 'aria-hidden',
    VALUE: 'true',
  },
];

const toggleElement = (
  element: HTMLElement,
  isVisible: boolean,
  ATTR: Attribute,
) => {
  const CACHED_ATTR = `data-original-${ATTR.NAME}`;

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
};

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  selector: {
    visibility: string;
    tabbing: string;
  },
): ((isVisible: boolean) => void) => {
  return (isVisible: boolean) => {
    CONFIGS.forEach(({ SELECTOR, ...ATTR }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        selector[SELECTOR],
      );

      elements.forEach((element) => {
        if (
          !element?.contains(menu) && // not a parent
          !menu?.contains(element) && // not a child
          element !== menuTrigger // not the trigger
        ) {
          toggleElement(element, isVisible, ATTR);
        }
      });
    });
  };
};

export default setupToggleOutsideElements;
