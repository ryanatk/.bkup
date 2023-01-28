/**
 * Toggle an element's attribute based on a flag,
 * caching the original value in a "data-original-*" attribute,
 * so it can be restored when toggled back.
 */

export interface Attr {
  NAME: string;
  VALUE: string;
}

export const PRECEDENCE_LABEL = 'precedence';
export const DEFAULT_LABEL = 'original';
export const getDataAttr = (label: string, attrName: string): string =>
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
  const cachedAttr = getDataAttr(label, ATTR.NAME);
  const precedenceAttr = getDataAttr(PRECEDENCE_LABEL, ATTR.NAME);
  const prevLabel = element.getAttribute(precedenceAttr);
  const isChangingPrecedence = prevLabel && prevLabel !== label;
  const originalValue =
    isToggled && !isChangingPrecedence
      ? element.getAttribute(ATTR.NAME)
      : element.getAttribute(getDataAttr(prevLabel, ATTR.NAME));

  if (isToggled) {
    // set precedence label
    element.setAttribute(precedenceAttr, label);

    // when precedence changes, update the value with cached value
    if (isChangingPrecedence) {
      element.setAttribute(ATTR.NAME, originalValue);
    }

    // Cache original value of element, to reset when re-enabling elements
    // (skip this step if cached attribute already exists)
    if (element.hasAttribute(ATTR.NAME)) {
      element.setAttribute(cachedAttr, originalValue);
    }

    // Set attribute to the toggled value
    element.setAttribute(ATTR.NAME, ATTR.VALUE);

    // remove previous cache
    element.removeAttribute(getDataAttr(prevLabel, ATTR.NAME));
  } else {
    // only update if current label has precedence
    if (prevLabel === label) {
      // remove precedence label
      element.removeAttribute(precedenceAttr);

      // When re-enabling the elements
      if (element.hasAttribute(cachedAttr)) {
        // Reset to original value
        element.setAttribute(ATTR.NAME, element.getAttribute(cachedAttr));
        element.removeAttribute(cachedAttr);
      } else {
        // Remove value
        element.removeAttribute(ATTR.NAME);
      }
    }

    // remove cache
    element.removeAttribute(getDataAttr(label, ATTR.NAME));
  }

  return {
    element,
    cachedAttr,
    originalValue,
  };
};

export default toggleElementAttr;
