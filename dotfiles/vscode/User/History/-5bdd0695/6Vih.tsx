import cx from 'classnames';
import { ReactNode } from 'react';
import Icon from '../../../sormus/Icon';

interface Props {
  children: ReactNode;
  padTop?: boolean;
  screen?: boolean;
}

const Section = ({
  children,
  padTop,
  screen,
  icon: SVG,
}: Props): JSX.Element => (
  <section
    className={cx('pb-20 lg:pb-24', {
      'min-h-screen': screen,
      'pt-20 lg:pt-24': padTop,
    })}
  >
    {SVG && (
      <Icon outlined size="large">
        <SVG />
      </Icon>
    )}
    {children}
  </section>
);

export default Section;
