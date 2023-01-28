export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export const isZero = (num) => num <= 0;

const reducer = (quantity, { type, payload }) => {
  const { increment, max, min } = payload;

  switch (type) {
    case TYPE.INCREMENT: {
      const newQuantity = quantity + increment;

      if (newQuantity > max) {
        return max;
      } else {
        return newQuantity;
      }
    }
    case TYPE.DECREMENT: {
      const newQuantity = quantity - increment;

      if (isZero(newQuantity)) {
        return 0;
      } else if (newQuantity < min) {
        return min;
      } else {
        return newQuantity;
      }
    }
    case TYPE.UPDATE: {
      return payload;
    }
    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;
