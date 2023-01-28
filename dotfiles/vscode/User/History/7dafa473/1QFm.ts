/**
 * Traverse the menu with keyboard.
 */

import { inRange } from 'lodash';

export const MENU_TRIGGER_INDEX = -1;

// common actions to map with keys
export const ACTION = {
  CLICK: 'click',
  ESCAPE: 'escape',
  NEXT: 'next',
  PREVIOUS: 'previous',
  TAB: 'tab',
};

// map each key to a common action
export const KEY = {
  ' ': ACTION.CLICK,
  space: ACTION.CLICK,
  escape: ACTION.ESCAPE,
  down: ACTION.NEXT,
  arrowdown: ACTION.NEXT,
  right: ACTION.NEXT,
  arrowright: ACTION.NEXT,
  up: ACTION.PREVIOUS,
  arrowup: ACTION.PREVIOUS,
  left: ACTION.PREVIOUS,
  arrowleft: ACTION.PREVIOUS,
  tab: ACTION.TAB,
};

export const getMenuLinks = (menu) =>
  menu ? Array.from(menu.querySelectorAll('a')) : [];

interface MenuProps {
  menu: HTMLElement;
  menuTrigger: HTMLElement;
  // menuLinks: HTMLElement[];
  currentIndex: number;
  onTraverse: (index: number) => void;
  onEscape: () => void;
}

const traverseMenu = (
  event: KeyboardEvent,
  {
    menu,
    menuTrigger,
    // menuLinks,
    currentIndex,
    onTraverse,
    onEscape,
  }: MenuProps,
): void => {
  const activeElement = document.activeElement;
  const isMenuFocused = menu.contains(activeElement);
  const isTriggerFocused = activeElement === menuTrigger;
  const menuLinks = getMenuLinks(menu);

  if (!isMenuFocused && !isTriggerFocused) {
    if (typeof onEscape === 'function') {
      onEscape();
    }

    return;
  }

  const handleTraverse = (index: number) => {
    onTraverse(index);
  };

  // helper fn containing traversal & focus logic
  const updateFocus = (index: number) => {
    const el = index === MENU_TRIGGER_INDEX ? menuTrigger : menuLinks[index];
    (el as HTMLElement)?.focus();
  };

  switch (KEY[event.key.toLowerCase()]) {
    // Close menu when esc is pressed while it's open and re-focus on the trigger
    case ACTION.ESCAPE: {
      if (typeof onEscape === 'function') {
        onEscape();
      }

      handleTraverse(MENU_TRIGGER_INDEX);
      updateFocus(MENU_TRIGGER_INDEX);
      break;
    }

    // Re-implement "space" for buttons (in case we prevent scrolling)
    case ACTION.CLICK: {
      console.log(event.target);
      event.preventDefault();
      (activeElement as HTMLElement).click();
      break;
    }

    // Keep focusedLinkIndexRef in sync with links focused via tabbing
    case ACTION.TAB: {
      if (isTriggerFocused) {
        handleTraverse(MENU_TRIGGER_INDEX);
      } else {
        // when using "tab" key, don't trap user in the menu
        handleTraverse(menuLinks.indexOf(activeElement as HTMLAnchorElement));
      }

      break;
    }

    // Traverse links from top to bottom
    case ACTION.NEXT: {
      event.preventDefault();
      const newIndex = currentIndex + 1;

      // when using "arrow" keys, trap user in the menu
      if (inRange(newIndex, menuLinks.length)) {
        const newIndex = currentIndex + 1;

        handleTraverse(newIndex);
        updateFocus(newIndex);
      }

      break;
    }

    // Traverse links from bottom to top
    case ACTION.PREVIOUS: {
      event.preventDefault();
      const newIndex = currentIndex - 1;

      // when using "arrow" keys, trap user in the menu
      if (inRange(newIndex, menuLinks.length)) {
        handleTraverse(newIndex);
        updateFocus(newIndex);
      }

      break;
    }

    default: {
      return;
    }
  }
};

export default traverseMenu;
