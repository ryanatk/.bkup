import { createStory } from 'common/stories/utils';

import { QuantityButton, Toast } from 'common/components';
import { useState } from 'react';

const Wrap = (props) => {
  const [toast, setToast] = useState('');

  return (
    <>
      <QuantityButton
        {...props}
        onMin={(quantity, payload) => {
          setToast(
            `Min is ${quantity}. This is an optional event trigger (does not need to be an alert like this).`,
          );
          console.log('!QuantityButton.onMin', { quantity, payload });
        }}
        onMax={(quantity, payload) => {
          setToast(
            `Max is ${quantity}. This is an optional event trigger (does not need to be an alert like this).`,
          );
        }}
        onZero={(quantity, payload) => {
          setToast(
            `Removed. This is an optional event trigger (does not need to be an alert like this).`,
          );
          console.log('!QuantityButton.onZero', { quantity, payload });
        }}
      />

      <Toast>{toast}</Toast>
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

export const SetOptions = story({
  number: 7,
  increment: 2,
  max: 10,
  min: 4,
});
