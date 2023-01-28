export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export const isZero = (num) => num <= 0;

const reducer = (quantity, { type, payload }) => {
  switch (type) {
    case TYPE.UPDATE: {
      return payload;
    }

    case TYPE.INCREMENT: {
      const newQuantity = quantity + payload.updateIncrement;

      if (newQuantity > payload.max) {
        return payload.max;
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
      } else {
        return newQuantity;
      }
    }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;
