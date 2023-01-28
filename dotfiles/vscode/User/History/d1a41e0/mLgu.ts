export interface Attr {
  NAME: string;
  VALUE: string;
}

export const CACHED_PREFIX = 'data-original';

const toggleHiddenAttr = (
  element: HTMLElement,
  isHidden: boolean,
  ATTR: Attr,
): HTMLElement => {
  const CACHED_ATTR = `${CACHED_PREFIX}-${ATTR.NAME}`;

  if (isHidden) {
    // Cache initial value of element, to reset when re-enabling elements
    if (element.hasAttribute(ATTR.NAME)) {
      element.setAttribute(CACHED_ATTR, element.getAttribute(ATTR.NAME));
    }

    // Set attribute to the hidden value, for a11y
    element.setAttribute(ATTR.NAME, ATTR.VALUE);
  } else {
    // When re-enabling the elements
    if (element.hasAttribute(CACHED_ATTR)) {
      // Reset to original value
      element.setAttribute(ATTR.NAME, element.getAttribute(CACHED_ATTR));
    } else {
      // Remove hidden attribute
      element.removeAttribute(ATTR.NAME);
    }
  }

  return element;
};

export default toggleHiddenAttr;
