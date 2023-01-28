import { ReactElement } from 'react';
import { Typography, TypographyRhythm } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs?: string[] | ReactElement[];
}

const Slide = ({ title, paragraphs = [] }: Props): JSX.Element => (
  <TypographyRhythm>
    <Typography
      Element="h3"
      variant="h6"
      color="inherit"
      weight="normal"
      className="m-0"
    >
      {title}
    </Typography>

    {paragraphs.map((text, i) => (
      <Typography color="inherit" key={title + i}>
        {text}
      </Typography>
    ))}
  </TypographyRhythm>
);

export default Slide;
