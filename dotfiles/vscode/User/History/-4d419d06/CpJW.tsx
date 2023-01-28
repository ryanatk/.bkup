export const MAIN_CONTENT_ID = 'main-content';

interface Props {
  children?: any;
}

/**
 * This component provides semantic meaning, and aids with a11y.
 *
 * This component should:
 * - not be used for styling
 * - not differ from page to page
 * - be used exactly 1 time on each page
 * - contain everything on the page, except the main `header` & `footer` elements
 * - be linked to by the "skip to content" link
 */
const MainContent = ({ children }: Props): JSX.Element => {
  return (
    <main
      id={MAIN_CONTENT_ID} // needed for "skip to content" link
      data-cy={MAIN_CONTENT_ID}
      aria-label="Main Content"
      tabIndex={-1} // makes the element focusable without including it in the tab order
    >
      {children}
    </main>
  );
};

export default MainContent;
