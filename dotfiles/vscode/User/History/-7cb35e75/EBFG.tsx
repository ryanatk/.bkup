import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';

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
  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);

  useEffect(() => {
    addScript(hubSpot, { onload: () => setIsHubSpotLoaded(true) });
    // don't clean up, so we only load scripts once
  }, [setIsHubSpotLoaded]);

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
