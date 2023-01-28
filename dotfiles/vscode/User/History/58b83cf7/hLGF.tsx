import { ReactElement, ReactNode } from 'react';
import { Typography, TypographyRhythm } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs: ReactNode;
}

const Slide = ({ title, paragraphs }: Props): JSX.Element => (
  <TypographyRhythm>
    <Typography Element="h3" variant="h6" color="inherit" weight="normal">
      {title}
    </Typography>

    {paragraphs.map((text) => (
      <Typography color="inherit">{text}</Typography>
    ))}
  </TypographyRhythm>
);

export default Slide;
