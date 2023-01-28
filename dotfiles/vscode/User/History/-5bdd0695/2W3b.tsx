import cx from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  padTop?: boolean;
  screen?: boolean;
}

const Section = ({ children, padTop }: Props): JSX.Element => (
  <section
    className={cx('pb-20 lg:pb-24', {
      'min-h-screen': screen,
      'pt-20 lg:pt-24': padTop,
    })}
  >
    {children}
  </section>
);

export default Section;
