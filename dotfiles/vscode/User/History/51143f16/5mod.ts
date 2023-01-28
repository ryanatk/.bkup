/**
 * Toggle visibility & tabbing of outside elements,
 * hiding them from screen readers
 *
 * Setup function accepts initial config,
 * returning a function to toggle on & off.
 */

import toggleElementAttr, { Attr } from './toggleElementAttr';

interface Config extends Attr {
  SELECTOR: string;
}

const CONFIGS: Config[] = [
  {
    SELECTOR: 'visibility',
    NAME: 'aria-hidden',
    VALUE: 'true',
  },
  {
    SELECTOR: 'tabbing',
    NAME: 'tabindex',
    VALUE: '-1',
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
