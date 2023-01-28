import cx from 'classnames';
import { HTMLProps, ReactElement, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLElement> {
  children: ReactNode;
  padTop?: boolean;
  screen?: boolean;
}

const Section = ({ children, padTop, screen, id }: Props): ReactElement => (
  <section
    className={cx('pb-20 lg:pb-24', {
      'min-h-screen': screen,
      'pt-20 lg:pt-24': padTop,
    })}
    id={id}
  >
    {children}
  </section>
);

export default Section;
