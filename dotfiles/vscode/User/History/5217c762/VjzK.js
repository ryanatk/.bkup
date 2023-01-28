import { TEXT } from '..';
import ROUTE from '../route';
import BOOTH_TYPE from './booth-type';

const X = ' x ';

const BOOTH_SETUP = {
  NUMBER: {
    index: 0,
    templateId: 1,
    path: ROUTE.BOOTH_NUMBER,
    defaultValue: '1',
  },
  TYPE: {
    index: 1,
    templateId: 2,
    path: ROUTE.BOOTH_TYPE,
    show: ({ options }) =>
      Array.isArray(options) &&
      Object.values(BOOTH_TYPE).filter(({ value }) => {
        return options.includes(value);
      }).length > 1,
  },
  LOCATION: {
    index: 2,
    templateId: 3,
    path: ROUTE.BOOTH_LOCATION,
    show: ({ options }) => options?.length > 1,
  },
  SIZE: {
    index: 3,
    templateId: 4,
    path: ROUTE.BOOTH_SIZE,
    maskInput: (...values) => [...values].join(X),
    maskOutput: (answer) => {
      if (!answer) {
        return answer;
      }

      if (answer?.includes(X)) {
        return answer;
      }

      return (
        <>
          {answer} ft<sup className={TEXT.OVERLINE}>2</sup>
        </>
      );
    },
    parseValues: (answer) => {
      if (!answer) {
        return undefined;
      }

      const [length, width] = answer.split(X);

      return isNaN(length) || isNaN(width)
        ? { length, width }
        : { area: answer };
    },
  },
};

export default BOOTH_SETUP;
