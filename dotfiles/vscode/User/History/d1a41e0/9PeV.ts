export interface Attribute {
  NAME: string;
  VALUE: string;
}

export const CACHED_PREFIX = 'data-original';

const toggleElement = (
  element: HTMLElement,
  isVisible: boolean,
  ATTR: Attribute,
): HTMLElement => {
  const CACHED_ATTR = `${CACHED_PREFIX}-${ATTR.NAME}`;

  if (isVisible) {
    // Reset to original value when re-enabling the elements
    if (element.hasAttribute(CACHED_ATTR)) {
      element.setAttribute(ATTR.NAME, element.getAttribute(CACHED_ATTR));
    } else {
      element.removeAttribute(ATTR.NAME);
    }
  } else {
    // Cache initial value of element to reset when re-enabling elements
    if (element.hasAttribute(ATTR.NAME)) {
      element.setAttribute(CACHED_ATTR, element.getAttribute(ATTR.NAME));
    }
    element.setAttribute(ATTR.NAME, ATTR.VALUE);
  }

  return element;
};

export default toggleElement;
