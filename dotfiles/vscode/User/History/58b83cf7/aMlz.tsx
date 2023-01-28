import { ElementType, ReactElement } from 'react';
import { Typography, TypographyRhythm } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs?: string[] | ReactElement[];
  icon?: ElementType;
}

const Slide = ({ title, paragraphs = [], icon: Icon }: Props): JSX.Element => (
  <TypographyRhythm>
    {Icon && <Icon />}

    <Typography
      Element="h3"
      variant="h6"
      color="inherit"
      weight="normal"
      className="mt-0"
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
