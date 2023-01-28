import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  MENU_TRIGGER_INDEX,
  preventScrolling,
  setupToggleOutsideElements,
  setupTraverseMenu,
} from '../utils';

interface UseHeaderA11yOptions {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  matchLargeScreen: boolean;
}

interface UseHeaderA11yState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
  disabledOutsideElements: MutableRefObject<boolean>;
}

const useHeaderA11y = ({
  isOpen,
  setIsOpen,
  matchLargeScreen,
}: UseHeaderA11yOptions): UseHeaderA11yState => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const focusedLinkIndexRef = useRef<number>(MENU_TRIGGER_INDEX);
  const disabledOutsideElements = useRef<boolean>(false);

  // Prevent scrolling while menu is open
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && !matchLargeScreen) {
        preventScrolling(event);
        // Prevent scrolling via arrow keys when moving through nav links
      }
    },
    [isOpen, matchLargeScreen],
  );

  // Traverse the menu with keyboard
  const traverseMenu = setupTraverseMenu({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,
    onTraverse: (i) => {
      focusedLinkIndexRef.current = i;
    },
    onEscape: () => setIsOpen(false),
  });

  const handleKeyup = useCallback(
    (event) => {
      if (isOpen && !matchLargeScreen) {
<<<<<<< HEAD
        traverseMenu(event, focusedLinkIndexRef.current);
=======
        switch (key.toLowerCase()) {
          // Close menu when esc is pressed while it's open and re-focus on the trigger
          case 'escape': {
            setIsOpen(false);
            menuTriggerRef.current.focus();
            break;
          }
          // Keep focusedLinkIndex in sync with links focused via tabbing
          case 'tab': {
            if (
              menuRef.current.contains(document.activeElement) ||
              document.activeElement === menuTriggerRef.current
            ) {
              if (document.activeElement === menuTriggerRef.current) {
                focusedLinkIndex.current = -1;
              } else {
                focusedLinkIndex.current = menuLinks.indexOf(
                  document.activeElement as HTMLAnchorElement,
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
            // Go to first menu link when pressing arrow key while focused on trigger
            if (document.activeElement === menuTriggerRef.current) {
              focusedLinkIndex.current = 0;
            } else {
              // If not tabbed to last menu link, go to the next one
              if (focusedLinkIndex.current + 1 < menuLinks.length) {
                focusedLinkIndex.current += 1;
              }
            }
            menuLinks[focusedLinkIndex.current].focus();
            break;
          }
          // Traverse links from bottom to top
          case 'up':
          case 'arrowup':
          case 'arrowleft': {
            event.preventDefault();
            // If not tabbed to last menu link, go to the next one
            if (focusedLinkIndex.current - 1 >= 0) {
              focusedLinkIndex.current -= 1;
            }
            menuLinks[focusedLinkIndex.current].focus();
            break;
          }
        }
>>>>>>> origin/ecom-3717-ios-mobile-menu-a11y
      }
    },
    [isOpen, traverseMenu, matchLargeScreen],
  );

  // Hide outside elements from screen readers
  const toggleOutsideElements = setupToggleOutsideElements(
    menuRef.current,
    menuTriggerRef.current,
    {
      tabbing: '*',
      visibility:
        'a[href], button, input, textarea, select, details, iframe, [tabindex]:not([tabindex="-1"])',
    },
  );

  useEffect(() => {
    const isOutsideHidden = isOpen && !matchLargeScreen;

    if (disabledOutsideElements.current !== isOutsideHidden) {
      toggleOutsideElements(isOutsideHidden);
      disabledOutsideElements.current = isOutsideHidden;
    }
  }, [isOpen, matchLargeScreen, toggleOutsideElements]);

  // Bind global keyboard event listeners
  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('keyup', handleKeyup);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      document.body.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return {
    menuRef,
    menuTriggerRef,
    disabledOutsideElements,
  };
};

export default useHeaderA11y;
