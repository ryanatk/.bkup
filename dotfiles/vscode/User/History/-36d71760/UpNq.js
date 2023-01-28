import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('prevents default on click', () => {
    // initialise an event, and assign your own preventDefault
    const keydownEvent = new KeyboardEvent('keydown', {
      key: ' ',
    });
    const e = Object.assign({}, keydownEvent, {
      preventDefault: jest.fn(),
    });

    preventScrolling(e);

    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });
});
