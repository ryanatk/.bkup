import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { func, number, string } from 'prop-types';
import cx from 'classnames';

import { IconButton } from 'common/components';

// assumes that `0` is the lowest quantity
// negative quantity, min, or max, are not handled

import reducer, { TYPE, isZero, init } from './reducer';
import styles from './QuantityButton.module.css';
import { TEXT } from 'common/const';

const QuantityButton = ({
  input: isInput,
  number: initialQuantity,
  addIncrement,
  updateIncrement,
  max,
  min,
  zeroIcon = 'trash',
  onChange,
  onMax = () => null,
  onMin = () => null,
  onZero = () => null,
  className,
  textClass,
  ...rest
}) => {
  // console.log('<QuantityButton>', { initialQuantity, addIncrement, updateIncrement, max, min });

  const input = useRef();
  // const [value, setValue] = useState(initialQuantity);

  const [state, dispatch] = useReducer(
    reducer,
    init({
      quantity: initialQuantity,
      min,
      max,
      addIncrement,
      updateIncrement,
    }),
  );

  const { quantity } = useMemo(() => state, [state]);

  useEffect(() => {
    // console.log('!QuantityButton: check `zero`');
    if (isZero(quantity)) {
      onZero(state);
    }
  }, [quantity, state, onZero]);

  useEffect(() => {
    // console.log('!QuantityButton: check `min`');
    if (quantity === min) {
      onMin(state);
    }
  }, [quantity, state, min, onMin]);

  useEffect(() => {
    // console.log('!QuantityButton: check `max`');
    if (quantity === max) {
      onMax(state);
    }
  }, [quantity, state, max, onMax]);

  useEffect(() => {
    // console.log('!QuantityButton.update', { initialQuantity });
    dispatch({
      type: TYPE.UPDATE,
      payload: initialQuantity,
    });
  }, [initialQuantity]);

  const handleDecrement = useCallback(() => {
    // console.log('decrement', state.decrementTo);
    onChange(state.decrementTo);
  }, [state, onChange]);

  const handleIncrement = useCallback(() => {
    // console.log('increment', state.incrementTo);
    onChange(state.incrementTo);
  }, [state, onChange]);

  const handleSubmit = useCallback(() => {
    // console.log('increment', state.handleSubmit);
    // console.log(input, input?.current, input?.current?.value);
    // onChange(input.current.value);
    onChange(quantity);
  }, [onChange]);

  return (
    <div className={cx(className, styles.wrap)} {...rest}>
      <IconButton
        className={styles.minus}
        onClick={handleDecrement}
        icon={
          (zeroIcon && isZero(quantity - updateIncrement)) ||
          quantity === addIncrement
            ? zeroIcon
            : 'minus'
        }
        disabled={quantity === min}
        color="inherit"
      />

      {isInput ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.form}
        >
          <input
            ref={input}
            className={cx(TEXT.SUBTITLE, textClass, styles.input)}
            // defaultValue={quantity}
            pattern="[0-9]{1,5}"
            value={quantity}
            onChange={({ target = {} }) => {
              const { value } = target;

              if (typeof value === 'number') {
                dispatch({
                  type: TYPE.UPDATE,
                  payload: Number(target.value),
                });
              }
            }}
          />

          {/* Needed so ENTER key will submit form */}
          <input type="submit" hidden />
        </form>
      ) : (
        <span className={cx(TEXT.SUBTITLE, textClass, styles.number)}>
          {quantity}
        </span>
      )}

      <IconButton
        className={styles.plus}
        onClick={handleIncrement}
        icon="plus"
        disabled={quantity === max}
        color="inherit"
      />
    </div>
  );
};

QuantityButton.propTypes = {
  className: string,
  addIncrement: number,
  updateIncrement: number,
  max: number,
  min: number,
  number: number,
  onChange: func.isRequired,
  onMax: func,
  onMin: func,
  onZero: func,
  zeroIcon: string,
};

export default QuantityButton;
