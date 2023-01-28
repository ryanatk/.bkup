import { useState } from 'react';

import { createStory } from 'common/stories/utils';

import { QuantityButton, Toast } from 'common/components';

const Wrap = (props) => {
  const [toast, setToast] = useState('');

  return (
    <>
      <QuantityButton
        {...props}
        onMin={(quantity) =>
          setToast(
            `Min is ${quantity}. This is an optional event trigger (does not need to be an alert like this).`,
          )
        }
        onMax={(quantity) =>
          setToast(
            `Max is ${quantity}. This is an optional event trigger (does not need to be an alert like this).`,
          )
        }
        onZero={() =>
          setToast(
            `Removed. This is an optional event trigger (does not need to be an alert like this).`,
          )
        }
      />

      <Toast isOpen={Boolean(toast)} close={() => setToast('')}>
        {toast}
      </Toast>
    </>
  );
};

export default {
  title: 'Clicks/Quantity Button',
  component: QuantityButton,
  args: {},
  argTypes: {},
};

const story = (args) => createStory(Wrap, args);

export const Default = story();

export const Labor = story({
  number: 0,
  addIncrement: 1,
  updateIncrement: 0.25,
});

export const SetOptions = story({
  number: 7,
  updateIncrement: 2,
  max: 10,
  min: 4,
});
