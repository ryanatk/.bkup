import tw from 'twin.macro';
import { MAIN_CONTENT_ID } from '../MainContent';

const Wrap = tw.div`
  sr-only

  focus-within:(
    not-sr-only
    py-2
    px-4
  )
`;

const SkipToContent = (): JSX.Element => {
  return (
    <Wrap>
      <a href={`#${MAIN_CONTENT_ID}`} data-cy="skip-to-content">
        {/* {t('header_skip_to_content')} */}
        asdf
      </a>
    </Wrap>
  );
};

export default SkipToContent;
