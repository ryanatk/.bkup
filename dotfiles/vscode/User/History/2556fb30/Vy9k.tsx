interface Props {
  children: any;
}

const MainContent = ({ children }: Props): JSX.Element => {
  return (
    <main id="main-content" aria-label="Main Content">
      {children}
    </main>
  );
};

export default MainContent;
