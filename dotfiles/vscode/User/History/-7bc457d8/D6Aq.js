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
  // const isLabor =
  //   (id >= 4000 && id <= 4999) ||
  //   (id >= 8101 && id <= 8108) ||
  //   (id >= 8201 && id <= 8203) ||
  //   (id >= 8901 && id <= 8904) ||
  //   (id >= 11401 && id <= 11402) ||
  //   (id >= 11441 && id <= 11446);

  const isLabor = LABOR_RANGES.some(([start, end]) => id >= start && id <= end);

  if (isLabor) {
    return LABOR_INC;
  }

  return DEFAULT_INC;
};

export default getItemUpdateIncrement;
