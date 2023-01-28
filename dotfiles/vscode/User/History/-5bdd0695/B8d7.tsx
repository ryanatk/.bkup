import cx from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  padTop?: boolean;
}

const Section = ({ children, padTop }: Props): JSX.Element => (
  <section
    className={cx('min-h-screen pb-20 lg:pb-24', {
      'pt-20 lg:pt-24': padTop,
    })}
  >
    {children}
  </section>
);

export default Section;
