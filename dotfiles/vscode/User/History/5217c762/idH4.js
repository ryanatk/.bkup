import { TEXT } from '..';
import ROUTE from '../route';
import BOOTH_TYPE from './booth-type';

const X = ' x ';

const BOOTH_SETUP = {
  NUMBER: {
    templateId: 1,
    path: ROUTE.BOOTH_NUMBER,
    defaultValue: '1',
  },
  TYPE: {
    templateId: 2,
    path: ROUTE.BOOTH_TYPE,
    show: ({ options }) => {
      return (
        Array.isArray(options) &&
        Object.values(BOOTH_TYPE).filter(({ value }) => {
          return options.includes(value);
        }).length > 1
      );
    },
  },
  LOCATION: {
    templateId: 3,
    path: ROUTE.BOOTH_LOCATION,
    show: ({ options }) => {
      return options?.length > 1;
    },
  },
  SIZE: {
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
        return answer;
      }

      const [length, width] = answer.split(X);

      return isNaN(length) || isNaN(width)
        ? { length, width }
        : { area: answer };
    },
  },
};

export default BOOTH_SETUP;
