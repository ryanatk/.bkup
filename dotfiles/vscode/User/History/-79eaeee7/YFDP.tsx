import cx from 'classnames';
import { ReactElement } from 'react';
import { TypographyProps } from '../../../sormus/Typography';
import Typ from './Typ';

const Eyebrow = ({
  Element = 'span',
  children,
  className,
  ...props
}: TypographyProps): ReactElement => {
  return (
    <Typ
      variant="eyebrow"
      weight="bold"
      Element={Element}
      className={cx(className, 'uppercase tracking-widest')}
      {...props}
    >
      {children}
    </Typ>
  );
};

export default Eyebrow;
