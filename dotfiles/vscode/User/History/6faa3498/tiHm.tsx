interface Props {
  children: any;
}

// TODO: update font-family, once that's merged in

const Em = ({ children }: Props): JSX.Element => <em>{children}</em>;

export default Em;
