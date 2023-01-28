interface Props {
  children: any;
}

const Section = ({ children }: Props): JSX.Element => (
  <section className="min-h-screen py-20 lg:(py-24)">{children}</section>
);

export default Section;
