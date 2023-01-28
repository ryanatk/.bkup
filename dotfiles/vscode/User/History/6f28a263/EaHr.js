import { useAuth } from 'app/context';
import { RouterLink } from 'common/components';
import { BUTTON_TYPES } from 'common/components/const';
import { scrollToTop, track } from 'common/utils';

import getClickProps from './getClickProps';

const useClick = (props = {}) => {
  const { update: updateAuth } = useAuth();
  const {
    track: trackingData,
    noScroll,
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

      console.log({ noScroll });
      if (!noScroll) {
        scrollToTop();
      }
    },
  };
};

export default useClick;
