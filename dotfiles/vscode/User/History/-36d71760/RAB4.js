import preventScrolling, { PREVENTED_KEYS } from './preventScrolling';

describe('preventScrolling:', () => {
  test('Fires preventDefault on prevented key', () => {
    PREVENTED_KEYS.map((key) => {
      const e = new KeyboardEvent('keydown', {
        key,
      });

      e.preventDefault = jest.fn();
      preventScrolling(e);

      expect(e.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  test('Does not fire preventDefault on other keys', () => {
    const OTHER_KEYS = ['enter', 'shift', 'a', '1', 'delete', 'escape'].filter(
      (key) => !PREVENTED_KEYS.includes(key),
    );

    OTHER_KEYS.map((key) => {
      const e = new KeyboardEvent('keydown', {
        key,
      });

      e.preventDefault = jest.fn();
      preventScrolling(e);

      expect(e.preventDefault).toHaveBeenCalledTimes(1);
    });
  });
});
