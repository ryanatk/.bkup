import addScript from '../addScript';

const ID = 'script-id';
const SRC = 'script-src';

test('doFunction', () => {
  jest.spyOn(document.head, 'appendChild');

  addScript({ id: ID, src: SRC });

  expect.any(HTMLScriptElement);
  //   expect(document.head.appendChild).toBeCalledWith(
  //     expect.objectContaining({
  //       src: SRC,
  //       id: ID,
  //     }),
  //   );
  expect(document.head.innerHTML).toBe(
    '<script src="the-src" async="true"></script>',
  );
});
