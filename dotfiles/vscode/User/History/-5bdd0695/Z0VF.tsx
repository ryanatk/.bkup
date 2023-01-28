import cx from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  padTop?: boolean;
}

const Section = ({ children }: Props): JSX.Element => (
  <section className={cx('min-h-screen py-20 lg:(py-24)')}>{children}</section>
);

export default Section;
