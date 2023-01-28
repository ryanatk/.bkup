interface Props {
  children: any;
}

const Em = ({ children }: Props): JSX.Element => (
  <em className="font-serif">{children}</em>
);

export default Em;
