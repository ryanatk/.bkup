import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('prevents default on click', () => {
    // initialise an event, and assign your own preventDefault
    const e = new KeyboardEvent('keydown', {
      key: 'arrowup',
    });
    // const e = Object.assign({}, keydownEvent, {
    //   preventDefault: jest.fn(),
    // });
    e.preventDefault = jest.fn();

    preventScrolling(e);

    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });
});
