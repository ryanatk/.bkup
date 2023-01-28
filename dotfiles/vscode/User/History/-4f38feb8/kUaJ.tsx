import { ReactElement, ReactNode } from 'react';
import Typ from './Typ';

interface Props {
  h1?: boolean;
  className?: string;
  children: ReactNode;
}

const Title = ({ h1, className, children }: Props): ReactElement => (
  <Typ Element={h1 ? 'h1' : 'h2'} variant="h1" className={className}>
    {children}
  </Typ>
);

export default Title;
