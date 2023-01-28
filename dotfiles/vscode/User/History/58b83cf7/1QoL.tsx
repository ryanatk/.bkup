import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { Typography, TypographyRhythm } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs?: string[] | ReactElement[];
}

export const useSlideChange = (location: string) => (index: number) => {
  const { asPath } = useRouter();

  sendGTMWithSegmentEvent({
    type: EventType.ModuleClicked,
    payload: {
      cta: `slide-${index}`,
      path: asPath,
      ...payload,
    },
  });
};

const Slide = ({ title, paragraphs = [] }: Props): JSX.Element => (
  <TypographyRhythm>
    <Typography Element="h3" variant="h6" color="inherit" weight="normal">
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