import { renderHook } from '@testing-library/react-hooks';
import usePartnerUtm, { STORAGE_KEY } from '../usePartnerUtm';
import { useRouter } from 'next/router';
import stateStorage, { loadState, saveState } from '../../utils/stateStorage';

jest.mock('../../utils/stateStorage', () => ({
  loadState: jest.fn(),
  saveState: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const QUERY_VALUE = 'query-params';
const QUERY_PARAMS = { utm_medium: QUERY_VALUE };
const STORAGE_VALUE = 'saved-state';
const STORAGE_OBJECT = { utm_medium: STORAGE_VALUE };

const setup = (options = {}) => {
  const { hasQuery, hasStorage, match, readOnly } = options;
  const query = hasQuery ? QUERY_PARAMS : {};
  const savedState = hasStorage ? STORAGE_OBJECT : undefined;
  const matchParams = match?.length ? { utm_medium: match } : {};

  loadState.mockReturnValue(savedState);
  useRouter.mockReturnValue({
    route: '/product/horizon-silver',
    push: jest.fn(),
    query,
  });

  const { result } = renderHook(() =>
    usePartnerUtm({ readOnly, ...matchParams }),
  );

  return { query, result: result.current };
};

describe('usePartnerUtm', () => {
  // afterEach(() => {
  //   jest.resetAllMocks();
  // });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('always returns the full shape', () => {
    const { result } = setup();

    expect(result).toMatchObject({
      utm: {},
      isMatch: false,
      isMatchParams: false,
      isMatchStorage: false,
    });
  });

  describe('with query params', () => {
    const OPTIONS = { hasQuery: true };

    test('writes query params to storage', () => {
      const { result } = setup(OPTIONS);
      expect(saveState).toBeCalledWith(result.utm, STORAGE_KEY);
      expect(saveState).toBeCalledTimes(1);
    });

    test('returns the utm', () => {
      // const { result } = run();
      expect(result.utm).toEqual(expect.objectContaining(QUERY_PARAMS));
    });
  });

  describe('with query params & read only', () => {
    const run = () => setup({ hasQuery: true, readOnly: true });
    // setup({ hasQuery: true, readOnly: true });
    run();

    test('does not write to storage', () => {
      expect(saveState).not.toHaveBeenCalled();
    });
  });

  describe('with query params & matching string', () => {
    const { result } = setup({ hasQuery: true, match: QUERY_VALUE });

    test('matches the value from the params', () => {
      expect(result.isMatch).toEqual(true);
      expect(result.isMatchParams).toEqual(true);
      expect(result.isMatchStorage).toEqual(false);
    });
  });

  describe('with query params & matching array', () => {
    const { result } = setup({
      hasQuery: true,
      match: ['unmatching', QUERY_VALUE],
    });

    test('matches the value from the params', () => {
      expect(result.isMatch).toEqual(true);
      expect(result.isMatchParams).toEqual(true);
      expect(result.isMatchStorage).toEqual(false);
    });
  });

  describe('with no query params & no partner in storage', () => {
    const { result } = setup();

    test('utm is undefined', () => {
      expect(result.utm).toBeUndefined();
    });

    test('does not match', () => {
      expect(result.isMatch).toBe(false);
      expect(result.isMatchParams).toBe(false);
      expect(result.isMatchStorage).toBe(false);
    });
  });

  describe('with no query params & a partner in storage & matching string', () => {
    const { result } = setup({ hasStorage: true, match: STORAGE_VALUE });

    test('matches the value from storage', () => {
      expect(result.isMatch).toEqual(true);
      expect(result.isMatchParams).toEqual(false);
      expect(result.isMatchStorage).toEqual(true);
    });
  });

  describe('with no query params & a partner in storage & matching array', () => {
    const { result } = setup({
      hasStorage: true,
      match: ['unmatched', STORAGE_VALUE],
    });

    test('matches the value from storage', () => {
      expect(result.isMatch).toEqual(true);
      expect(result.isMatchParams).toEqual(false);
      expect(result.isMatchStorage).toEqual(true);
    });
  });
});
