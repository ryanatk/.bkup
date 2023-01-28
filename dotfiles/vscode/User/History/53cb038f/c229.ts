import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

interface UseAccordionOptions {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  matchLargeScreen: boolean;
}

interface UseAccordionState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
  disabledOutsideElements: MutableRefObject<boolean>;
}

const useAccordion = ({
  isOpen,
  setIsOpen,
}: UseAccordionOptions): UseAccordionState => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const focusedLinkIndex = useRef<number>(-1);
  const disabledOutsideElements = useRef<boolean>(false);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (isOpen) {
        // Prevent scrolling via arrow keys when moving through nav links
        if (
          ['up', 'arrowup', 'down', 'arrowdown', 'space'].includes(
            key.toLowerCase(),
          )
        ) {
          event.preventDefault();
        }
      }
    },
    [isOpen],
  );

  const handleKeyup = useCallback(
    (event: KeyboardEvent) => {
      if (!menuRef.current || !menuTriggerRef.current) {
        return;
      }
      const { key } = event;
      if (isOpen) {
        const menuLinks = Array.from(menuRef.current.querySelectorAll('a'));
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
      }
    },

    [isOpen, setIsOpen, menuRef, menuTriggerRef, focusedLinkIndex],
  );

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

export default useAccordion;
