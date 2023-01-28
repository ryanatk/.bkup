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
import { CONTACT_FORM } from '../data';

export interface ModalContextValues {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<string>>;
  isHubSpotLoaded: boolean;
}

export const MODAL_ID = {
  CONNECT: 'business-modal-connect-with-us',
  WELLNESS: CONTACT_FORM.WELLNESS.modalId,
  PERFORMANCE: CONTACT_FORM.PERFORMANCE.modalId,
  RESEARCH: CONTACT_FORM.RESEARCH.modalId,
  HEALTHCARE: CONTACT_FORM.HEALTHCARE.modalId,
};

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

export const useModalContext = (id): ModalContextValues =>
  useContext(() => ModalContext(id));

export default ModalContext;
