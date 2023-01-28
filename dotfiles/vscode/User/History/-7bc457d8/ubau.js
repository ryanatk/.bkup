export const LABOR_INCREMENT = 0.25;
export const DEFAULT_INCREMENT = 1;
export const LABOR_RANGES = [
  [4000, 4999],
  [8101, 8108],
  [8201, 8203],
  [8901, 8904],
  [11401, 11402],
  [11441, 11446],
];

const getUpdateIncrement = (id) => {
  const isLabor = LABOR_RANGES.some(([start, end]) => id >= start && id <= end);

  if (isLabor) {
    return LABOR_INCREMENT;
  }

  return DEFAULT_INCREMENT;
};

export default getUpdateIncrement;
