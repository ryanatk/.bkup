import { ReactElement } from 'react';
import { TypographyProps } from '../../../sormus/Typography';
import Typ from './Typ';

const Eyebrow = ({
  Element = 'span',
  children,
}: TypographyProps): ReactElement => {
  return (
    <Typ
      variant="eyebrow"
      weight="bold"
      Element={Element}
      className="uppercase tracking-widest"
    >
      {children}
    </Typ>
  );
};

export default Eyebrow;
