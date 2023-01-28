/**
 * Toggle an element's attribute based on a flag,
 * caching the original value in a "data-original-*" attribute,
 * so it can be restored when toggled back.
 */

export interface Attr {
  NAME: string;
  VALUE: string;
}

export const CACHED_PREFIX = 'data-original';

export const getCachedAttr = () => 'data-original';

const toggleElementAttr = (
  element: HTMLElement,
  isToggled: boolean,
  ATTR: Attr,
  label = 'original',
): { element: HTMLElement } => {
  const CACHED_ATTR = `data-${label}-${ATTR.NAME}`;

  if (isToggled) {
    // Cache original value of element, to reset when re-enabling elements
    // (skip this step if cached attribute already exists)
    if (element.hasAttribute(ATTR.NAME) && !element.hasAttribute(CACHED_ATTR)) {
      element.setAttribute(CACHED_ATTR, element.getAttribute(ATTR.NAME));
    }

    // Set attribute to the toggled value
    element.setAttribute(ATTR.NAME, ATTR.VALUE);
  } else {
    // When re-enabling the elements
    if (element.hasAttribute(CACHED_ATTR)) {
      // Reset to original value
      element.setAttribute(ATTR.NAME, element.getAttribute(CACHED_ATTR));
    } else {
      // Remove cached attribute
      element.removeAttribute(ATTR.NAME);
    }
  }

  return {
    element,
  };
};

export default toggleElementAttr;
