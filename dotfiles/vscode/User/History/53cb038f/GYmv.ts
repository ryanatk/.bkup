import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import useTraverseMenu from '../../../../hooks/useTraverseMenu';
import { breakpoints } from '../../../sormus/constants';

interface UseAccordionOptions {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface UseAccordionState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
}

const useAccordion = ({
  isOpen,
  setIsOpen,
}: UseAccordionOptions): UseAccordionState => {
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useTraverseMenu({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,

    isCaptured: isOpen && !isLargeScreen,
    onEscape: () => setIsOpen(false),
  });

  return {
    menuRef,
    menuTriggerRef,
  };
};

export default useAccordion;
