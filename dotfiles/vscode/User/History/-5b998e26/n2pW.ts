import addScript from '../addScript';

const ID = 'script-id';
const SRC = 'script-src';

test('doFunction', () => {
  jest.spyOn(document.head, 'appendChild');

  addScript({ id: ID, src: SRC });

  expect(document.head.innerHTML).toBe(
    `<script id="${ID}" src="${SRC}"></script>`,
  );
});
