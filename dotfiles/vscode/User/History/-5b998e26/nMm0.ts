import addScript from '../addScript';

const ID = 'script-id';
const SRC = 'script-src';

test('doFunction', () => {
  jest.spyOn(document.head, 'appendChild');

  addScript({ id: ID, src: SRC });

  expect(document.head.appendChild).toBeCalledWith(
    expect.objectContaining({
      src: SRC,
      id: ID,
    }),
  );
});
