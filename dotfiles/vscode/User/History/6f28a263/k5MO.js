import { useAuth } from 'app/context';
import { RouterLink } from 'common/components';
import { BUTTON_TYPES } from 'common/components/const';
import { track } from 'common/utils';

import getClickProps from './getClickProps';

const useClick = (props = {}) => {
  const { update: updateAuth } = useAuth();
  const {
    track: trackingData,
    scrollTo,
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
        // allow `track` prop to be an "event name" (string)
        // or be an array, including "event name" & "data"
        const [name, data] = Array.isArray(trackingData)
          ? trackingData
          : [trackingData];

        track(name, data);
      }

      if (props.onClick) {
        props.onClick(...args);
      }

      /**
       * Handle scrolling
       * Allow any link to explicitly set scrollTo prop.
       * Automatically scroll to top, whenever `to` prop is set
       */
      if (typeof scrollTo === 'number' || Boolean(clickProps.to)) {
        window.scroll(0, scrollTo ?? 0);
      }
    },
  };
};

export default useClick;
