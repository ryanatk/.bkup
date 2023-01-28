interface Props {
  children: any;
}

// TODO: update font-family, once that's merged in
// TODO: consider moving this to sormus (maybe with a better name?)

const Em = ({ children }: Props): JSX.Element => (
  <em className="font-serif">{children}</em>
);

export default Em;
