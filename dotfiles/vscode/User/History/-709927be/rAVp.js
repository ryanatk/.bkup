import cx from 'classnames';

import { TEXT } from 'common/const';

import styles from './Input.module.css';
import { useCallback, useEffect, useState } from 'react';

const Input = ({ submit, textClass, value: initialValue, state }) => {
  console.log({ initialValue, state });

  // can be number or string
  const [value, setValue] = useState(initialValue);

  // update value whenever "initialValue" changes
  useEffect(() => setValue(initialValue), [initialValue, state]);

  // submit value
  const handleSubmit = useCallback(() => submit(value), [value, submit]);

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
