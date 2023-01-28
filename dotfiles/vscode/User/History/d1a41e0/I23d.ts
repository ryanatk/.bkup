/**
 * Toggle an element's attribute based on a flag,
 * caching the initial value in a "data-original-*" attribute,
 * so it can be restored when toggled back.
 */

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
