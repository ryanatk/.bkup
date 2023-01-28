import cx from 'classnames';
import { ReactElement } from 'react';
import { TypographyProps } from '../../../sormus/Typography';
import Typ from './Typ';

interface EyebrowProps extends TypographyProps {
  small?: boolean;
}

const Eyebrow = ({
  Element = 'span',
  children,
  className,
  small,
  ...props
}: EyebrowProps): ReactElement => {
  return (
    <Typ
      variant={small ? 'caption' : 'eyebrow'}
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
