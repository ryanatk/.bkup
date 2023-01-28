import { ReactElement } from 'react';
import { Typography, TypographyRhythm } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs?: string[] | ReactElement[];
}

const Slide = ({ title, paragraphs = [] }: Props): JSX.Element => (
  <TypographyRhythm>
    <Typography Element="h3" variant="h6" color="inherit" weight="normal">
      {title}
    </Typography>

    {paragraphs.map((text) => (
      <Typography color="inherit" key={text}>
        {text}
      </Typography>
    ))}
  </TypographyRhythm>
);

export default Slide;
