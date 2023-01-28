export const LABOR_INC = 0.25;
export const DEFAULT_INC = 1;
export const LABOR_RANGES = [
  [4000, 4999],
  [8101, 8108],
  [8201, 8203],
  [8901, 8904],
  [11401, 11402],
  [11441, 11446],
];

const getItemUpdateIncrement = (id) => {
  const isLabor = LABOR_RANGES.some(([start, end]) => id >= start && id <= end);

  if (isLabor) {
    return LABOR_INC;
  }

  return DEFAULT_INC;
};

export default getItemUpdateIncrement;
