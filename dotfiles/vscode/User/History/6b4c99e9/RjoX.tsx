export type AccoladesData = {
  alt: string;
  src: { src: string; srcSet: string };
  content: JSX.Element;
};

export interface AccoladesProps {
  accolades: AccoladesData[];
  isABTest?: boolean;
}

const Accolades = ({ accolades, isABTest }: AccoladesProps) => {};

export default Accolades;
