import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { func, number, string } from 'prop-types';
import cx from 'classnames';

import { TEXT } from 'common/const';
import { IconButton } from 'common/components';

// assumes that `0` is the lowest quantity
// negative quantity, min, or max, are not handled

import reducer, { TYPE, isZero, init } from './reducer';
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

  const updateQuantity = (qty) =>
    dispatch({
      type: TYPE.UPDATE,
      payload: qty,
    });

  useEffect(() => {
    // console.log('!QuantityButton.update', { initialQuantity });
    updateQuantity(initialQuantity);
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
    onChange(quantity);
  }, [onChange, quantity]);

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
        <Input handleSubmit={handleSubmit} />
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
