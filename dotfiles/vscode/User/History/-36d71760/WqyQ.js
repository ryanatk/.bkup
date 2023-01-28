import preventScrolling, { PREVENTED_KEYS } from './preventScrolling';

describe('preventScrolling', () => {
  test('fires preventDefault on prevented key', () => {
    PREVENTED_KEYS.map((key) => {
      const e = new KeyboardEvent('keydown', {
        key,
      });

      e.preventDefault = jest.fn();
      preventScrolling(e);

      expect(e.preventDefault).toHaveBeenCalledTimes(1);
    });
  });
});
