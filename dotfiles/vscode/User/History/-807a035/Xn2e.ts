/**
 * Traverse the menu with keyboard.
 */

import { inRange } from 'lodash';
import { KeyboardEvent } from 'react';

export const MENU_TRIGGER_INDEX = -1;

interface SetupElements {
  menu: HTMLElement;
  menuTrigger: HTMLElement;
  onTraverse: (index: number) => void;
  onEscape: () => void;
}

const setupKeyup = ({
  menu,
  menuTrigger,
  onTraverse,
  onEscape,
}: SetupElements): ((e: KeyboardEvent, i: number) => void) => {
  const menuLinks: HTMLElement[] = menu
    ? Array.from(menu.querySelectorAll('a'))
    : [];

  // helper fn containing traversal & focus logic
  const handleTraverse = (index: number, isFocusUpdated?: boolean) => {
    console.log({ index });
    if (inRange(index, menuLinks.length)) {
      onTraverse(index);

      if (!isFocusUpdated) {
        // menuLinks[index]?.focus();
      }
    } else if (index === MENU_TRIGGER_INDEX) {
      onTraverse(MENU_TRIGGER_INDEX);

      if (!isFocusUpdated) {
        // menuTrigger.focus();
      }
    }
  };

  return (event: KeyboardEvent, currentIndex: number): void => {
    const { key } = event;

    // initially set focus on trigger
    handleTraverse(currentIndex);

    switch (key.toLowerCase()) {
      // Close menu when esc is pressed while it's open and re-focus on the trigger
      case 'escape': {
        if (typeof onEscape === 'function') {
          onEscape();
        }

        handleTraverse(MENU_TRIGGER_INDEX);
        break;
      }

      // Keep focusedLinkIndexRef in sync with links focused via tabbing
      case 'tab': {
        console.log(menu.contains(document.activeElement));
        console.log(document.activeElement === menuTrigger);
        if (
          menu.contains(document.activeElement) ||
          document.activeElement === menuTrigger
        ) {
          console.log(
            '###',
            document.activeElement === menuTrigger,
            menuLinks,
            document.activeElement,
          );

          if (document.activeElement === menuTrigger) {
            handleTraverse(MENU_TRIGGER_INDEX, true);
          } else {
            handleTraverse(
              menuLinks.indexOf(document.activeElement as HTMLAnchorElement),
              true,
            );
          }
        }

        break;
      }

      // Traverse links from top to bottom
      case 'down':
      case 'arrowdown':
      case 'right':
      case 'arrowright': {
        event.preventDefault();

        if (document.activeElement === menuTrigger) {
          handleTraverse(0);
        } else {
          handleTraverse(currentIndex + 1);
        }

        break;
      }

      // Traverse links from bottom to top
      case 'up':
      case 'arrowup':
      case 'arrowleft': {
        event.preventDefault();
        handleTraverse(currentIndex - 1);
        break;
      }
    }
  };
};

export default setupKeyup;
