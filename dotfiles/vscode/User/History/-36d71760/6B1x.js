import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('prevents default on click', () => {
    // initialise an event, and assign your own preventDefault
    const clickEvent = new KeyboardEvent('keydown');
    const e = Object.assign(clickEvent, {
      key: ' ',
      preventDefault: jest.fn(),
    });
    preventScrolling(e);

    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });
});
