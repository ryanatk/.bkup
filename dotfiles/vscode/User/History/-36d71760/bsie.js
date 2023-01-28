import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('prevents default on click', () => {
    // initialise an event, and assign your own preventDefault
    const e = new KeyboardEvent('keydown', {
      key: ' ',
      preventDefault: jest.fn(),
    });

    preventScrolling(e);

    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });
});
