import tw from 'twin.macro';
import { MAIN_CONTENT_ID } from '../MainContent';

const Skip = tw.a`
  sr-only

  focus-within:block
`;

const SkipToContent = () => {
  return <Skip><a href={`#${MAIN_CONTENT_ID}`}>Skip to Content</Link></Skip>;
};

export default SkipToContent;
