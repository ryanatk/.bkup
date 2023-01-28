interface Props {
  children: any;
}

const Main = ({ children }: Props): JSX.Element => {
  return <main id="main-content">{children}</main>;
};

export default Main;
