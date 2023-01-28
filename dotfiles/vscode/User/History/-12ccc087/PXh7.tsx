import tw from 'twin.macro';
import { MAIN_CONTENT_ID } from '../MainContent';

const Link = tw.a`
`;

const SkipToContent = () => {
  return <Link href={`#${MAIN_CONTENT_ID}`}>Skip to Content</Link>;
};

export default SkipToContent;
