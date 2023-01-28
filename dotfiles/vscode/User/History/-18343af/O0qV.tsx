import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { ScrollTeaser } from '../components/sormus/ScrollTeaser/ScrollTeaserNew';

const Context = createContext<Dispatch<SetStateAction<boolean>>>(null);

export const useScrollTeaserContext = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      'Did you forget to include the ScrollTeaserProvider in your tree?',
    );
  }

  return ctx;
};

interface ScrollTeaserProviderProps {
  children: ReactNode;
  text: JSX.Element | string;
}

const ScrollTeaserProvider = ({
  children,
  text,
}: ScrollTeaserProviderProps) => {
  const [isScrollTeaserVisible, setIsScrollTeaserVisible] =
    useState<boolean>(true);
  return (
    <Context.Provider value={setIsScrollTeaserVisible}>
      {children}
      <ScrollTeaser isVisible={isScrollTeaserVisible} text={text} />
    </Context.Provider>
  );
};

export default ScrollTeaserProvider;
