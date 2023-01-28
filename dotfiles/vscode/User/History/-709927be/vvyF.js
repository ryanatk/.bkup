import cx from 'classnames';

import { isZero } from './reducer';
import { TEXT } from 'common/const';

import styles from './Input.module.css';
import { useCallback, useEffect, useState } from 'react';

const Input = ({ submit, textClass, value: initialValue, state }) => {
  console.log({ initialValue, state });

  const checkQuantity = useCallback(
    (qty) => {
      const quantity = Number(qty);
      const { addIncrement, updateIncrement, max, min } = state;
      const remainder = (quantity - addIncrement) % updateIncrement;

      if (isZero(quantity)) {
        return 0;
      } else if (quantity > max) {
        // show toast
        return max;
      } else if (quantity < min) {
        // show toast
        return min;
        // } else if (quantity < addIncrement) {
        //   // show toast
        //   return addIncrement;
      } else if (remainder) {
        // show toast
        return quantity - remainder + updateIncrement;
      } else {
        return quantity;
      }
    },
    [state],
  );

  // can be number or string
  const [value, setValue] = useState(checkQuantity(initialValue));

  // update value whenever "initialValue" changes
  useEffect(
    () => setValue(checkQuantity(initialValue)),
    [initialValue, checkQuantity, state],
  );

  // submit value
  const handleSubmit = useCallback(
    () => submit(checkQuantity(value)),
    [value, submit, checkQuantity],
  );

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
        pattern="[0-9.0-9]{1,5}"
        inputMode="decimal"
        value={value}
        onChange={({ target = {} }) => {
          if (!isNaN(target.value)) {
            // set as string, to keep the trailing decimal
            setValue(target.value);
          } else if (target.value === '.') {
            // keep the leading decimal, while still providing a number
            setValue('0.');
          }
        }}
        onBlur={handleSubmit}

        // helpful attr's, but they show the browser's warnings instead of our own
        // type="number"
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
