import { ReactNode } from 'react';
import Header from './Header';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

const Section = ({ title, subtitle, children }: Props): JSX.Element => (
  <section className="min-h-screen py-20 lg:(py-24)">
    {(title || subtitle) && <Header />}
    {children}
  </section>
);

export default Section;
