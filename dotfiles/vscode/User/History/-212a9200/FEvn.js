import { createStory } from 'common/stories/utils';

import { QuantityButton, Toast } from 'common/components';
import { useState } from 'react';

const Wrap = (props) => {
  const [isMin, setIsMin] = useState(false)
  const [isMax, setIsMax] = useState(false)
  const [isZero, setIsZero] = useState(false)

  return <>
  <QuantityButton {...props}

    onMin: (quantity, payload) => {
      Toast(
        `Min is ${quantity}. This is an optional event trigger (does not need to be an alert like this).`,
      );
      console.log('!QuantityButton.onMin', { quantity, payload });
    },
    onMax: (quantity, payload) => {
      alert(`Max is ${quantity}`);
      console.log(
        '!QuantityButton.onMax. This is an optional event trigger (does not need to be an alert like this).',
        { quantity, payload },
      );
    },
    onZero: (quantity, payload) => {
      alert(
        `Removed. This is an optional event trigger (does not need to be an alert like this).`,
      );
      console.log('!QuantityButton.onZero', { quantity, payload });
    },

  />


  <Toast></Toast>

</>


}

export default {
  title: 'Clicks/Quantity Button',
  component: QuantityButton,
  args: {},
  argTypes: {},
};

const story = (args) => createStory(QuantityButton, args);

export const Default = story();

export const SetOptions = story({
  number: 7,
  increment: 2,
  max: 10,
  min: 4,
});
