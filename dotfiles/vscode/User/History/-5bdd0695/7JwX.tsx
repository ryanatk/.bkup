import { ReactNode } from 'react';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

const Section = ({ title, subtitle, children }: Props): JSX.Element => (
  <section className="min-h-screen py-20 lg:(py-24)">{children}</section>
);

export default Section;
