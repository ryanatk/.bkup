export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
};

export const isZero = (num) => num <= 0;

const getIncrement = ({ quantity, addIncrement, updateIncrement, max }) => {
  const newQuantity = quantity + updateIncrement;

  if (newQuantity > max) {
    return max;
  } else if (newQuantity < addIncrement) {
    return addIncrement;
  } else {
    return newQuantity;
  }
};

const reducer = (state, { type, payload }) => {
  console.log({ state, type, payload });
  const { quantity, addIncrement, updateIncrement, min, max } = payload;

  switch (type) {
    case TYPE.UPDATE: {
      return {
        quantity,
        incrementQuantity: 2,
        decrementQuantity: 0,
      };
    }

    case TYPE.INCREMENT: {
      const newQuantity = quantity + payload.updateIncrement;

      if (newQuantity > payload.max) {
        return payload.max;
      } else if (newQuantity < payload.addIncrement) {
        return payload.addIncrement;
      } else {
        return newQuantity;
      }
    }

    case TYPE.DECREMENT: {
      const newQuantity = quantity - payload.updateIncrement;

      if (isZero(newQuantity)) {
        return 0;
      } else if (newQuantity < payload.min) {
        return payload.min;
      } else if (newQuantity < payload.addIncrement) {
        return quantity > payload.addIncrement ? payload.addIncrement : 0;
      } else {
        return newQuantity;
      }
    }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;