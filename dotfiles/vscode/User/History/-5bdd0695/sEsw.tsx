interface Props {
  children: any;
}

const Section = ({ children }: Props): JSX.Element => (
  <section>{children}</section>
);

export default Section;
