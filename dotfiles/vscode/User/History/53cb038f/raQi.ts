import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import useTraverseMenu from '../../../../hooks/useTraverseMenu';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useTraverseMenu({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,

    isCaptured: isOpen,
    onEscape: () => setIsOpen(false),
  });

  return {
    menuRef,
    menuTriggerRef,
  };
};

export default useAccordion;
