import tw from 'twin.macro';
import { MAIN_CONTENT_ID } from '../MainContent';

const Skip = tw.div`
  &:not(:focus-within) {
    sr-only
  }
`;

const SkipToContent = () => {
  return (
    <Skip>
      <a href={`#${MAIN_CONTENT_ID}`}>Skip to Content</a>
    </Skip>
  );
};

export default SkipToContent;