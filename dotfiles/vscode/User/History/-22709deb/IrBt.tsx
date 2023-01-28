import cx from 'classnames';
import { HTMLProps, ReactElement, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLElement> {
  children: ReactNode;
  padTop?: boolean;
}

const Section = ({ children, padTop, ...props }: Props): ReactElement => (
  <section
    className={cx('pb-20 lg:pb-24', {
      'pt-20 lg:pt-24': padTop,
    })}
    {...props}
  >
    {children}
  </section>
);

export default Section;
