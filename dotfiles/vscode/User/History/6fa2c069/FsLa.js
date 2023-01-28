import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DiscountChecker from './index';
import getDiscountCookie from '../../../../utils/getDiscountCookie';
import { useRouter } from 'next/router';
import * as checkFeatureFlag from '../../../../utils/checkFeatureFlag';

jest.mock('../../../../utils/getDiscountCookie', () => jest.fn());

jest.mock('react-redux', () => ({
  useDispatch: () => true,
  useSelector: () => ({
    lineItemDiscounts: [],
  }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const featureFlagMock = jest.spyOn(checkFeatureFlag, 'default');

global.matchMedia = () => {
  return {
    addEventListener: () => true,
    removeEventListener: () => true,
  };
};

describe('DiscountChecker Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`expect to render and fire discount action with query slug`, () => {
    featureFlagMock.mockReturnValueOnce(false); // enable-black-friday-2022
    useRouter.mockReturnValue({
      route: '/',
      push: jest.fn(),
      query: {
        slug: 'my-test-code',
      },
    });
    render(
      <DiscountChecker>
        <div>test child</div>
      </DiscountChecker>,
    );
    expect(getDiscountCookie).toHaveBeenCalledWith(
      true,
      'my-test-code',
      null,
      undefined,
    );
  });

  test(`expect to render and fire discount action when discount route is hit`, () => {
    featureFlagMock.mockReturnValueOnce(false); // enable-black-friday-2022
    useRouter.mockReturnValue({
      route: '/discount/[handle]',
      push: jest.fn(),
      query: {
        handle: 'my-test-code',
      },
    });
    render(
      <DiscountChecker>
        <div>test child</div>
      </DiscountChecker>,
    );
    expect(getDiscountCookie).toHaveBeenCalledWith(
      true,
      'my-test-code',
      null,
      undefined,
    );
  });

  test(`expect to render and not fire discount action when a blacklisted route is hit`, () => {
    featureFlagMock.mockReturnValueOnce(false); // enable-black-friday-2022
    useRouter.mockReturnValue({
      route: '/product/[handle]',
      push: jest.fn(),
      query: {
        handle: 'heritage-silver',
      },
    });
    render(
      <DiscountChecker>
        <div>test child</div>
      </DiscountChecker>,
    );
    expect(getDiscountCookie).toHaveBeenCalledWith(
      true,
      false,
      null,
      undefined,
    );
  });
});
