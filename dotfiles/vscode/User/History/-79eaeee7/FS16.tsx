import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Eyebrow = ({ children }: Props): ReactElement => {
  return (
    <Typ
      variant="eyebrow"
      weight="bold"
      Element="span"
      className="uppercase tracking-widest"
    >
      {children}
    </Typ>
  );
};
