import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface ModalContextValues {
  /** Optional boolean to flip background color and text color */
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextValues>(null);

export const ModalProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextValues =>
  useContext(ModalContext);

export default ModalContext;
