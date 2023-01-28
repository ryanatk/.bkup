export const LABOR_INCREMENT = 0.25;
export const DEFAULT_INCREMENT = 1;

const getUpdateIncrement = (isLabor) => {
  if (isLabor) {
    return LABOR_INCREMENT;
  }

  return DEFAULT_INCREMENT;
};

export default getUpdateIncrement;
