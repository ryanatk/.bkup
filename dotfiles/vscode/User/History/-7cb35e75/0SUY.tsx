import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import useHubSpotForms from '../hooks/useHubSpotForms';

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
  const { isHubSpotLoaded } = useHubSpotForms();

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
