import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, configure, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './HorizonHeader';
import { useSelector } from 'react-redux';
import useMediaQuery from '../../../hooks/useMediaQuery';

global.matchMedia = jest.fn().mockReturnValue({
  addEventListener: () => true,
  removeEventListener: () => true,
});

configure({ testIdAttribute: 'data-cy' });

jest.mock('react-intl', () => ({
  useIntl: jest.fn().mockReturnValue({ formatMessage: jest.fn() }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../public/locales/LocaleContext', () => ({
  t: (string) => string,
}));

jest.mock('../../../contexts/A11yContext', () => ({
  useA11yContext: jest.fn().mockReturnValue({
    prefersReducedMotion: false,
  }),
}));

jest.mock('../../../contexts/HeaderContext', () => ({
  useHeaderContext: jest.fn().mockReturnValue({
    inverse: false,
  }),
}));

jest.mock('../DiscountMessage', () =>
  jest
    .fn()
    .mockImplementation(() => (
      <div data-cy="discount-message">This is a discount message.</div>
    )),
);

jest.mock('../../../hooks/useMediaQuery', () => jest.fn());

describe('Header Component (Horizon)', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  test.skip('Renders the offcanvas on mobile when hideLinks is true', () => {
    useMediaQuery.mockReturnValue(false);
    render(<Header hideLinks />);
    expect(screen.queryByTestId('nav_offcanvas_closed')).toBeTruthy();
  });

  test.skip(`Doesn't render the offcanvas on desktop when hideLinks is true`, () => {
    useMediaQuery.mockReturnValue(true);
    render(<Header hideLinks />);
    expect(screen.queryByTestId('nav_offcanvas_closed')).toBeNull();
  });

  test.skip('Shows/hides offcanvas when hamburger button is clicked', () => {
    render(<Header />);
    expect(screen.queryByTestId('nav_offcanvas_closed')).toBeTruthy();
    userEvent.click(screen.getByTestId('nav_hamburger'));
    expect(screen.queryByTestId('nav_offcanvas_open')).toBeTruthy();
    userEvent.click(screen.getByTestId('nav_hamburger'));
    expect(screen.queryByTestId('nav_offcanvas_closed')).toBeTruthy();
  });

  test.skip(`Renders the cart button when user has selected items`, () => {
    useSelector.mockImplementation(() => ({
      totalCount: 2,
    }));
    render(<Header />);
    expect(screen.queryByTestId('nav_cart')).toBeTruthy();
  });

  test.skip(`Doesn't render the cart button when showCart is false`, () => {
    useSelector.mockImplementation(() => ({
      totalCount: 2,
    }));
    render(<Header showCart={false} />);
    expect(screen.queryByTestId('nav_cart')).toBeNull();
  });

  test.skip(`Renders the CTA when hideLinks is true`, () => {
    render(<Header hideLinks />);
    expect(screen.getByTestId('nav_shopcta')).toBeTruthy();
  });

  test(`Renders the CTA with default label when none is provided`, () => {
    render(<Header />);
    expect(screen.getAllByText('header_shop_now')[0]).toBeTruthy();
  });

  test(`Renders the CTA with custom label when one is provided`, () => {
    const label = 'Test Shop Now';
    render(<Header shopButton={{ label: label }} />);
    expect(screen.getAllByText(label)[0]).toBeTruthy();
  });

  test(`Doesn't render the discount message by default`, () => {
    render(<Header />);
    expect(screen.queryByTestId('discount-message')).toBeNull();
  });

  test(`Renders the discount message when showDiscountBanner is true`, () => {
    render(<Header showDiscountBanner />);
    expect(screen.queryByTestId('discount-message')).toBeTruthy();
  });

  test(`Allows user to open and close the menu using keyboard`, () => {
    render(<Header />);
    userEvent.tab();
    expect(screen.getByTestId('nav_hamburger')).toEqual(document.activeElement);
    userEvent.keyboard('{Enter}');
    expect(screen.queryByTestId('nav_offcanvas_open')).toBeTruthy();
    act(() => {
      userEvent.keyboard('${Escape}');
    });
    expect(screen.findByTestId('nav_offcanvas_closed')).toBeTruthy();
  });

  test(`Allows user to navigate the menu using keyboard`, () => {
    render(<Header />);
    userEvent.tab();
    expect(screen.getByTestId('nav_hamburger')).toEqual(document.activeElement);
    userEvent.keyboard('{Enter}');
    expect(screen.queryByTestId('nav_offcanvas_open')).toBeTruthy();
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('nav_ouraexperience')).toEqual(
      document.activeElement,
    );
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('nav_pulseblog')).toEqual(document.activeElement);
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('nav_ouraexperience')).toEqual(
      document.activeElement,
    );
    // Test that it traps focus inside menu when using arrow keys
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('nav_ouraexperience')).toEqual(
      document.activeElement,
    );
    userEvent.tab({ shift: true });
    expect(screen.getByTestId('nav_hamburger')).toEqual(document.activeElement);
  });
});
