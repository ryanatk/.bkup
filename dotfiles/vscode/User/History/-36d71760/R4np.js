import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('prevents default on click', () => {
    // initialise an event, and assign your own preventDefault
    const clickEvent = new KeyboardEvent();
    const e = Object.assign(clickEvent, {
      key: ' ',
      preventDefault: jest.fn(),
    });

    expect(preventScrolling(e)).toHaveBeenCalledTimes(1);
  });
});
