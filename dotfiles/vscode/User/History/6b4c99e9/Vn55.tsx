export type AccoladesData = {
  alt: string;
  src: { src: string; srcSet: string };
  content: JSX.Element;
};

export interface AccoladesProps {
  accolades: AccoladesData[];
  isABTest?: boolean;
  marquee?: boolean;
}

const Accolades = ({
  accolades,
  isABTest,
  marquee,
}: AccoladesProps): JSX.Element => {};

export default Accolades;
