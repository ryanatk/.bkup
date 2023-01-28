import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import useContactModal from '../hooks/useContactModal';

export interface ModalContextValues {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<string>>;
  isHubSpotLoaded: boolean;
}

const ModalContext = createContext<ModalContextValues>(null);

export const ModalProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [activeModal, setActiveModal] = useState(null);
  const { isHubSpotLoaded } = useContactModal();

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        isHubSpotLoaded,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextValues =>
  useContext(ModalContext);

export default ModalContext;
