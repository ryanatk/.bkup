import cx from 'classnames';

import { isZero } from './reducer';
import { TEXT } from 'common/const';

import styles from './Input.module.css';
import { useCallback, useEffect, useState } from 'react';

const Input = ({
  submit,
  textClass,
  value: initialValue,
  state,
  updateQuantity,
}) => {
  console.log({ initialValue, state });

  const checkQuantity = useCallback(
    (quantity, context) => {
      const { addIncrement, updateIncrement, max, min } = state;
      const remainder = (quantity - addIncrement) % updateIncrement;
      console.log('!Input.checkQuantity', { quantity, context });
      // console.log({ remainder });
      // console.log('fuck', { addIncrement, updateIncrement, max, min });

      if (isZero(quantity)) {
        return 0;
      } else if (quantity > max) {
        // show toast
        return max;
      } else if (quantity < min) {
        // show toast
        return min;
      } else if (quantity < addIncrement) {
        // show toast
        return quantity > addIncrement ? addIncrement : 0;
      } else if (remainder) {
        // show toast
        return quantity - remainder + updateIncrement;
      } else {
        return quantity;
      }
    },
    [state],
  );

  // const [value, setValue] = useState(checkQuantity(initialValue, 'init'));
  const [value, setValue] = useState('');

  // update value whenever "initialValue" changes
  useEffect(() => {
    console.log('!Input.useEffect', { initialValue });

    setValue(checkQuantity(initialValue), 'useEffect');
  }, [initialValue, checkQuantity, state]);

  // submit value
  const handleSubmit = useCallback(() => {
    const qty = checkQuantity(Number(value), 'handleSubmit');
    console.log('!Input.handleSubmit', { qty });
    // submit(qty);
    // setValue(qty);
    // updateQuantity(qty);
  }, [value, submit, checkQuantity]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={styles.form}
    >
      <input
        className={cx(TEXT.SUBTITLE, textClass, styles.input)}
        // type="number"
        pattern="[0-9.]{1,5}"
        inputMode="decimal"
        value={value}
        onChange={({ target = {} }) => {
          console.log('!Input.onChange', target.value, !isNaN(target.value));
          if (!isNaN(target.value)) {
            setValue(target.value);
          }
        }}
        onBlur={handleSubmit}

        // helpful attr's, but they show the browser's warnings instead of our own
        // max={state.max}
        // min={state.min}
        // step={state.updateIncrement}
      />

      {/* Needed so ENTER key will submit form */}
      <input type="submit" hidden />
    </form>
  );
};

export default Input;
