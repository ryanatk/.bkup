import React from 'react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { PageLayout } from './index';

configure({ testIdAttribute: 'data-cy' });

jest.mock('../../../public/locales/LocaleContext', () => ({
  t: (string) => string,
  useLocaleValues: (string) => ({ messages: {} }),
  useLocale: () => ({ selectedLocale: 'es' }),
}));

global.matchMedia = () => {
  return {
    addEventListener: () => true,
    removeEventListener: () => true,
  };
};

jest.mock('next/router', () => ({
  useRouter: () => jest.fn(),
}));

jest.mock('../../../queries/FeaturesConfig', () => ({
  useFeatureFlag: jest.fn().mockImplementation(() => ({
    enabled: false,
    laoding: false,
  })),
}));

jest.mock('../DiscountMessage', () =>
  jest
    .fn()
    .mockImplementation(() => (
      <div data-cy="discount-message">This is a discount message.</div>
    )),
);

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-intl', () => ({
  useIntl: jest.fn().mockReturnValue({ formatMessage: jest.fn() }),
}));

const props = {
  headerProps: {
    bordered: true,
    shopButtonLabel: 'Shop Now',
    hideLinks: false,
    inverse: false,
    showDiscountBanner: false,
    ref: null,
    showCart: true,
    className: '',
    onHeaderUpdate: () => {},
    target: undefined,
  },
};

describe('PageLayout Component', () => {
  test('expext PageLayout with props to match snapshot', () => {
    const tree = renderer.create(<PageLayout {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('expext PageLayout with no props to match snapshot', () => {
    const tree = renderer.create(<PageLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
