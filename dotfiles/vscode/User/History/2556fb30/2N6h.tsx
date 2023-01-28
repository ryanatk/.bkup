interface Props {
  children: any;
}

const MainContent = ({ children }: Props): JSX.Element => {
  return <main id="main-content">{children}</main>;
};

export default MainContent;
