import addScript from '../addScript';

const ID = 'script-id';
const SRC = 'script-src';

test('doFunction', () => {
  jest.spyOn(document.head, 'appendChild');

  addScript({ id: ID, src: SRC, async: false });

  expect(document.head.innerHTML).toContain(
    `<script id="${ID}" src="${SRC}"></script>`,
  );
});
