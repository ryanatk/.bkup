/**
 * Hide outside elements from screen readers
 * both in visibility & tabbing.
 */

import toggleElementAttr, { Attribute } from './toggleElementAttribute';

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

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  // allow consumer to pass in selectors, and associate them with configs (above)
  selector: {
    visibility: string;
    tabbing: string;
  },
): ((isHidden: boolean) => void) => {
  return (isHidden: boolean) => {
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
          toggleElementAttr(element, isHidden, ATTR);
        }
      });
    });
  };
};

export default setupToggleOutsideElements;
