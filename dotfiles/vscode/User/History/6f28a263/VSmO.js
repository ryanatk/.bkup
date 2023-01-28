import { useAuth } from 'app/context';
import { RouterLink } from 'common/components';
import { BUTTON_TYPES } from 'common/components/const';
import { track } from 'common/utils';

import getClickProps from './getClickProps';

const useClick = (props = {}) => {
  console.log('useClick', props);
  const { update: updateAuth } = useAuth();
  const {
    track: trackingData,
    scrollTo = 0,
    ...clickProps
  } = getClickProps({
    props,
    RouterLink,
    BUTTON_TYPES,
  });

  return {
    ...clickProps,
    onClick: (...args) => {
      updateAuth();

      if (trackingData) {
        track(trackingData);
      }

      if (props.onClick) {
        props.onClick(...args);
      }

      console.log({ scrollTo });
      if (typeof scrollTo === 'number') {
        window.scroll(0, scrollTo);
      }
    },
  };
};

export default useClick;