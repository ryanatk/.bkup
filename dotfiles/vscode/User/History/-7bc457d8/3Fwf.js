export const LABOR_INC = 0.25;
export const DEFAULT_INC = 1;

const getItemUpdateIncrement = (id) => {
  const isLabor =
    (id >= 4000 && id <= 4999) ||
    (id >= 8101 && id <= 8108) ||
    (id >= 8201 && id <= 8203) ||
    (id >= 8901 && id <= 8904) ||
    (id >= 11401 && id <= 11402) ||
    (id >= 11441 && id <= 11446);

  if (isLabor) {
    return LABOR_INC;
  }

  return DEFAULT_INC;
};

export default getItemUpdateIncrement;
