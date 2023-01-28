interface Props {
  children: any;
}

/**
 * This component should:
 * - not be used for styling
 * - be used exactly 1 time on each page
 * - contain everything on the page, except the main `header` & `footer` elements
 */
const MainContent = ({ children }: Props): JSX.Element => {
  return (
    <main id="main-content" aria-label="Main Content">
      {children}
    </main>
  );
};

export default MainContent;
