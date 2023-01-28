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
export const PRECEDENCE = 'data-precedence';
export const DEFAULT_LABEL = 'original';
export const getCachedAttr = (label: string, attrName: string): string =>
  `data-${label}-${attrName}`;

interface ToggledElement {
  element: HTMLElement;
  cachedAttr: string;
  originalValue: string | null;
}

const toggleElementAttr = (
  element: HTMLElement,
  isToggled: boolean,
  ATTR: Attr,
  label = DEFAULT_LABEL,
): ToggledElement => {
  const prevLabel = element.getAttribute(PRECEDENCE);
  const cachedAttr = getCachedAttr(label, ATTR.NAME);
  const originalValue = element.getAttribute(ATTR.NAME);

  if (isToggled) {
    console.log('isToggled');

    // set precedence label
    element.setAttribute(PRECEDENCE, label);

    // remove previous cache
    element.removeAttribute(getCachedAttr(prevLabel, ATTR.NAME));

    // Cache original value of element, to reset when re-enabling elements
    // (skip this step if cached attribute already exists)
    if (element.hasAttribute(ATTR.NAME)) {
      element.setAttribute(cachedAttr, originalValue);
    }

    // Set attribute to the toggled value
    element.setAttribute(ATTR.NAME, ATTR.VALUE);
  } else {
    // only update if current label has precedence
    if (prevLabel === label) {
      // remove precedence label
      element.removeAttribute(PRECEDENCE);
      console.log(element.hasAttribute(cachedAttr), cachedAttr);

      // When re-enabling the elements
      if (element.hasAttribute(cachedAttr)) {
        // Reset to original value
        element.setAttribute(ATTR.NAME, element.getAttribute(cachedAttr));
      } else {
        // Remove value
        element.removeAttribute(ATTR.NAME);
        console.log('remove', ATTR.NAME);
      }
    }

    // remove cache
    element.removeAttribute(getCachedAttr(label, ATTR.NAME));
  }

  return {
    element,
    cachedAttr,
    originalValue,
  };
};

export default toggleElementAttr;
