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
    show: ({ options }) =>
      Array.isArray(options) &&
      Object.values(BOOTH_TYPE).filter(({ value }) => {
        return options.includes(value);
      }).length > 1,
  },
  LOCATION: {
    templateId: 3,
    path: ROUTE.BOOTH_LOCATION,
    show: ({ options }) => options?.length > 1,
  },
  SIZE: {
    templateId: 4,
    path: ROUTE.BOOTH_SIZE,
    maskInput: (...values) => [...values].join(X),
    maskOutput: (response) => {
      if (!response) {
        return response;
      }

      if (response?.includes(X)) {
        return response;
      }

      return (
        <>
          {response} ft<sup className={TEXT.OVERLINE}>2</sup>
        </>
      );
    },
    parseValues: (response) => {
      if (!response) {
        return undefined;
      }

      const [length, width] = response.split(X);

      return isNaN(length) || isNaN(width)
        ? { length, width }
        : { area: response };
    },
  },
};

export default BOOTH_SETUP;
