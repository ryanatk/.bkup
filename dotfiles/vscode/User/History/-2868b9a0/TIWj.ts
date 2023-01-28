import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';

export const useSlideChange = (location: string): ((number) => void) => {
  const { asPath } = useRouter();

  return (index: number) =>
    sendGTMWithSegmentEvent({
      type: EventType.ModuleClicked,
      payload: {
        location,
        cta: `slide-${index}`,
        path: asPath,
      },
    });
};
