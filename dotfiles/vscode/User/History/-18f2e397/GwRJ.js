import React from 'react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { PageLayout } from './index';
import { EyebrowCTAProvider } from '../EyebrowCTA/EyebrowCTAProvider';

configure({ testIdAttribute: 'data-cy' });

jest.mock('../../../hooks/useGetBoundingClientRect', () => ({
  useGetBoundingClientRect: jest
    .fn()
    .mockImplementation(() => [{ height: 0 }, null]),
}));

jest.mock('../../../public/locales/LocaleContext', () => ({
  t: (string) => string,
  useLocaleValues: (string) => ({
    messages: {},
  }),
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

const PageLayoutWithProvider = (props) => (
  <EyebrowCTAProvider value={{ offsetHeight: 0, ref: null }}>
    <PageLayout {...props} />
  </EyebrowCTAProvider>
);

describe('PageLayout Component', () => {
  test('expext PageLayout with props to match snapshot', () => {
    const tree = renderer
      .create(<PageLayoutWithProvider {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('expext PageLayout with no props to match snapshot', () => {
    const tree = renderer.create(<PageLayoutWithProvider />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
