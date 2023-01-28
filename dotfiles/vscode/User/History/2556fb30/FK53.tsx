interface Props {
  children: any;
}

const Main = ({ children }: Props): JSX.Element => {
  <main id="main-content">{children}</main>;
};

export default Main;
