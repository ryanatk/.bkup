import cx from 'classnames';
import { ReactElement } from 'react';
import { TypographyProps } from '../../../sormus/Typography';
import Typ from './Typ';

interface EyebrowProps extends TypographyProps {
  small?: boolean;
  bold?: boolean;
}

const Eyebrow = ({
  Element = 'span',
  children,
  className,
  small,
  bold,
  ...props
}: EyebrowProps): ReactElement => {
  return (
    <Typ
      variant={small ? 'caption' : 'eyebrow'}
      weight={bold ? 'bold' : 'normal'}
      Element={Element}
      className={cx(className, 'uppercase tracking-widest')}
      {...props}
    >
      {children}
    </Typ>
  );
};

export default Eyebrow;
