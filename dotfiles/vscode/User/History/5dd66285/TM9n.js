import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { func, number, string } from 'prop-types';
import cx from 'classnames';

import { BORDER, TEXT } from 'common/const';
import { IconButton } from 'common/components';
import { isZero } from 'common/utils';

// assumes that `0` is the lowest quantity
// negative quantity, min, or max, are not handled

import reducer, { TYPE, init } from './reducer';
import Input from './Input';

import styles from './QuantityButton.module.css';

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

  // watch for props changing
  useEffect(() => {
    // console.log('!QuantityButton.update', { initialQuantity });
    dispatch({
      type: TYPE.UPDATE,
      payload: {
        quantity: initialQuantity,
        min,
        max,
        addIncrement,
        updateIncrement,
      },
    });
  }, [initialQuantity, min, max, addIncrement, updateIncrement]);

  useEffect(() => {
    // console.log('!QuantityButton: check `zero`');
    if (isZero(quantity)) {
      onZero(state);
    }
  }, [quantity, state, onZero]);

  useEffect(() => {
    // console.log('!QuantityButton: check `min`');
    if (quantity === state.min) {
      onMin(state);
    }
  }, [quantity, state, onMin]);

  useEffect(() => {
    // console.log('!QuantityButton: check `max`');
    if (quantity === state.max) {
      onMax(state);
    }
  }, [quantity, state, onMax]);

  const updateQuantity = (qty) =>
    dispatch({
      type: TYPE.UPDATE,
      payload: { quantity: qty },
    });

  const handleDecrement = useCallback(() => {
    // console.log('decrement', state.decrementTo);
    onChange(state.decrementTo);
  }, [state, onChange]);

  const handleIncrement = useCallback(() => {
    // console.log('increment', state.incrementTo);
    onChange(state.incrementTo);
  }, [state, onChange]);

  return (
    <div className={cx(className, BORDER.PAPER, styles.wrap)} {...rest}>
      <IconButton
        className={styles.minus}
        onClick={handleDecrement}
        icon={
          (zeroIcon && isZero(quantity - updateIncrement)) ||
          quantity === addIncrement
            ? zeroIcon
            : 'minus'
        }
        disabled={quantity <= min}
        color="inherit"
      />

      {isInput ? (
        <Input
          value={quantity}
          submit={onChange}
          textClass={textClass}
          state={state}
          updateQuantity={updateQuantity}
        />
      ) : (
        <span className={cx(TEXT.SUBTITLE, textClass, styles.number)}>
          {quantity}
        </span>
      )}

      <IconButton
        className={styles.plus}
        onClick={handleIncrement}
        icon="plus"
        disabled={quantity >= max}
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
