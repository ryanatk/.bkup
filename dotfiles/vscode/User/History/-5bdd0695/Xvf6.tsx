import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  padTop?: boolean;
  screen?: boolean;
  icon?: ReactElement;
}

const Section = ({ children, padTop, screen, icon }: Props): JSX.Element => (
  <section
    className={cx('pb-20 lg:pb-24', {
      'min-h-screen': screen,
      'pt-20 lg:pt-24': padTop,
    })}
  >
    {icon && (
      <Icon outlined size="large">
        <SVG />
      </Icon>
    )}
    {children}
  </section>
);

export default Section;
