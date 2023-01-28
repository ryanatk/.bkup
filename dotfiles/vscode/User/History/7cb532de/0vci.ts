/**
 * Traverse the menu with keyboard.
 */

import { KeyboardEvent, useCallback, useMemo, useRef } from 'react';
import preventScrolling from './preventScrolling';
import traverseMenu from './traverseMenu';

export const MENU_TRIGGER_INDEX = -1;

interface SetupElements {
  menu: HTMLElement;
  menuTrigger: HTMLElement;
  onEscape: () => void;
  isCaptured: boolean;
}

interface useTraverseMenuState {
  //   handleKeyup: (e: KeyboardEvent, i: number) => void;
  //   handleKeydown: (e: KeyboardEvent) => void;
}

const useTraverseMenu = ({
  menu,
  menuTrigger,
  isCaptured,
  onEscape,
}: SetupElements): useTraverseMenuState => {
  const focusedLinkIndex = useRef<number>(-1);
  const menuLinks: HTMLElement[] = useMemo(
    () => (menu ? Array.from(menu.querySelectorAll('a')) : []),
    [menu],
  );

  const handleTraverse = useCallback((index: number) => {
    focusedLinkIndex.current = index;
  }, []);

  // helper fn containing traversal & focus logic
  const updateFocus = useCallback(
    (index: number) => {
      const el = index === MENU_TRIGGER_INDEX ? menuTrigger : menuLinks[index];

      el?.focus();
    },
    [menuTrigger, menuLinks],
  );

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (isCaptured) {
        traverseMenu(e, {
          currentIndex: focusedLinkIndex.current,
          menu,
          menuTrigger,
          menuLinks,
          onEscape,
          handleTraverse,
          updateFocus,
        });
      }
    },
    [
      isCaptured,
      menu,
      menuTrigger,
      menuLinks,
      onEscape,
      handleTraverse,
      updateFocus,
    ],
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent): void => {
      if (isCaptured) {
        preventScrolling(event);
      }
    },
    [isCaptured],
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('keyup', handleKeyup);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      document.body.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return {
    // handleKeyup,
    // handleKeydown,
  };
};

export default useTraverseMenu;
