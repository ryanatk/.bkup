import tw from 'twin.macro';
import { MAIN_CONTENT_ID } from '../MainContent';

const Skip = tw.div`
  sr-only

  focus-within:(
    not-sr-only
    py-2
    px-4
  )
`;

const SkipToContent = () => {
  return (
    <Skip>
      <a href={`#${MAIN_CONTENT_ID}`}>Skip to Content</a>
    </Skip>
  );
};

export default SkipToContent;
