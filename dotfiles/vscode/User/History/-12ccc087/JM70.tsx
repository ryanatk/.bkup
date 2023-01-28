import { MAIN_CONTENT_ID } from '../MainContent';

const SkipToContent = () => {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      //  className="sr-only"
    >
      Skip to Content
    </a>
  );
};

export default SkipToContent;
