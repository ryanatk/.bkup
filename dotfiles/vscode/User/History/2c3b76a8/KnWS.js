export const LABOR_RANGES = [
  [4000, 4999],
  [8101, 8108],
  [8201, 8203],
  [8901, 8904],
  [11401, 11402],
  [11441, 11446],
];

const getIsLabor = (id) =>
  LABOR_RANGES.some(([start, end]) => id >= start && id <= end);

export default getIsLabor;
