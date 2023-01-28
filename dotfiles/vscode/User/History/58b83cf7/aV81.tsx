import { Typography, TypographyRhythm } from '../../../sormus';

const Slide = ({ title, paragraphs }) => (
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
