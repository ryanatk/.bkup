/**
 * Traverse the menu with keyboard.
 */

import {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import preventScrolling from './preventScrolling';
import traverseMenu from './traverseMenu';

export const MENU_TRIGGER_INDEX = -1;

interface TraverseMenu {
  onEscape: () => void;
  isCaptured: boolean;
}

interface MenuState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
}

const useTraverseMenu = ({ isCaptured, onEscape }: TraverseMenu): MenuState => {
  const menu = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const focusedLinkIndex = useRef<number>(-1);
  const menuLinks: HTMLElement[] = useMemo(
    () => (menu.current ? Array.from(menu.current.querySelectorAll('a')) : []),
    [],
  );

  //   const handleTraverse = useCallback((index: number) => {
  //     focusedLinkIndex.current = index;
  //   }, []);

  // helper fn containing traversal & focus logic
  //   const updateFocus = useCallback(
  //     (index: number) => {
  //       const el =
  //         index === MENU_TRIGGER_INDEX ? menuTrigger.current : menuLinks[index];

  //       el?.focus();
  //     },
  //     [menuTrigger, menuLinks],
  //   );

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (isCaptured) {
        traverseMenu(e, {
          currentIndex: focusedLinkIndex.current,
          menu: menu.current,
          menuTrigger: menuTrigger.current,
          menuLinks: menu.current
            ? Array.from(menu.current.querySelectorAll('a'))
            : [],
          onEscape,
          onTraverse: (index: number) => (focusedLinkIndex.current = index),
          //   handleTraverse,
          //   updateFocus,
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
    menuRef: menu,
    menuTriggerRef: menuTrigger,
  };
};

export default useTraverseMenu;
