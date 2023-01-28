import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import useTraverseMenu from '../../../../hooks/useTraverseMenu';

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
  const disabledOutsideElements = useRef<boolean>(false);
  const { menuRef, menuTriggerRef } = useTraverseMenu({
    isCaptured: isOpen && !matchLargeScreen,
    onEscape: () => setIsOpen(false),
  });

  useEffect(() => {
    const toggleOutsideElementsVisibility = (visible: boolean) => {
      if (!menuRef.current || !menuTriggerRef.current) {
        return;
      }
      const allElements = document.body.querySelectorAll<HTMLElement>('*');
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        if (
          !element.contains(menuRef.current) &&
          !menuRef.current?.contains(element) &&
          element !== menuTriggerRef.current
        ) {
          if (visible) {
            // Reset aria-hidden to original value when re-enabling the elements
            if (element.hasAttribute('data-original-aria-hidden')) {
              element.setAttribute(
                'aria-hidden',
                element.getAttribute('data-original-aria-hidden'),
              );
            } else {
              element.removeAttribute('aria-hidden');
            }
          } else {
            // Cache initial aria-hidden value of element to reset when re-enabling elements
            if (element.hasAttribute('aria-hidden')) {
              element.setAttribute(
                'data-original-aria-hidden',
                element.getAttribute('aria-hidden'),
              );
            }
            element.setAttribute('aria-hidden', 'true');
          }
        }
      }
    };

    const toggleOutsideElementsTabbing = (visible: boolean) => {
      const focusableElements = document.body.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, details, iframe, [tabindex]:not([tabindex="-1"])',
      );
      for (let i = 0; i < focusableElements.length; i++) {
        const element = focusableElements[i];
        if (
          !element.contains(menuRef.current) &&
          !menuRef.current.contains(element) &&
          element !== menuTriggerRef.current
        ) {
          if (visible) {
            // Reset tabindex to original value when re-enabling the elements
            if (element.hasAttribute('data-original-tabindex')) {
              element.setAttribute(
                'tabindex',
                element.getAttribute('data-original-tabindex'),
              );
            } else {
              element.removeAttribute('tabindex');
            }
          } else {
            // Cache initial tabindex value of element to reset when re-enabling elements
            if (element.hasAttribute('tabindex')) {
              element.setAttribute(
                'data-original-tabindex',
                element.getAttribute('tabindex'),
              );
            }
            element.setAttribute('tabindex', '-1');
          }
        }
      }
    };

    if (isOpen) {
      // Hide/disable all elements outside the nav when menu is open
      if (!disabledOutsideElements.current) {
        toggleOutsideElementsVisibility(false);
        toggleOutsideElementsTabbing(false);
        disabledOutsideElements.current = true;
      }
    } else {
      // Show/enable all focusable elements outside the menu when the menu is closed
      if (disabledOutsideElements.current) {
        toggleOutsideElementsVisibility(true);
        toggleOutsideElementsTabbing(true);
        disabledOutsideElements.current = false;
      }
    }

    if (matchLargeScreen) {
      // Show/enable elements if nav state is open when transitioning from mobile to desktop
      if (isOpen && disabledOutsideElements.current) {
        toggleOutsideElementsVisibility(true);
        toggleOutsideElementsTabbing(true);
        disabledOutsideElements.current = false;
      }
    } else {
      // Hide/disable elements if nav state is open when transitioning from desktop to mobile
      if (isOpen && !disabledOutsideElements.current) {
        toggleOutsideElementsVisibility(false);
        toggleOutsideElementsTabbing(false);
        disabledOutsideElements.current = true;
      }
    }
  }, [isOpen, matchLargeScreen, menuRef, menuTriggerRef]);

  return {
    menuRef,
    menuTriggerRef,
    disabledOutsideElements,
  };
};

export default useHeaderA11y;
