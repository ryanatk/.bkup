import getIsLabor from './getIsLabor';

export const LABOR_INCREMENT = 0.25;
export const DEFAULT_INCREMENT = 1;

const getUpdateIncrement = (id) => {
  const isLabor = getIsLabor(id);

  if (isLabor) {
    return LABOR_INCREMENT;
  }

  return DEFAULT_INCREMENT;
};

export default getUpdateIncrement;
