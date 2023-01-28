import { createContext, ReactNode, useContext, useState } from 'react';
import { ContactModal } from './components';

const Context = createContext(null);

export const useModalContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error('Did you forget to include ModalProvider in your tree?');
  }

  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

const CheckoutProvider = ({ children }: ProviderProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Context.Provider value={{ isOpen, setIsOpen }}>
      {children}

      <ContactModal open={isModalOpen} />
    </Context.Provider>
  );
};

export default CheckoutProvider;
