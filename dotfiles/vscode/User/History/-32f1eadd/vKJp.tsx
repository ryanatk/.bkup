import tw from 'twin.macro';
import { Box } from '..';

const Wrapper = tw.div`
  py-3.5 
  bg-white 
  text-center
`;

export interface EyebrowProps {
  displayMessage?: () => JSX.Element;
  className?: string;
}

export const Eyebrow = ({
  displayMessage: DisplayMessage,
  ...props
}): EyebrowProps => {
  if (!DisplayMessage) return null;

  return (
    <Wrapper data-testid="eyebrow-cta-message" {...props}>
      <Box>
        <DisplayMessage />
      </Box>
    </Wrapper>
  );
};

export default Eyebrow;
