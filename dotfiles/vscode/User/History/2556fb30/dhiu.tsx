export const MAIN_CONTENT = 'main-content';

interface Props {
  children: any;
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
    <main id={MAIN_CONTENT} aria-label="Main Content" data-cy={MAIN_CONTENT}>
      {children}
    </main>
  );
};

export default MainContent;
