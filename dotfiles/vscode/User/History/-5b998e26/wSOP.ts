import addScript from '../addScript';

const SCRIPT = {
  id: 'script-id',
  src: 'script-src',
};

test('doFunction', () => {
  jest.spyOn(document.head, 'appendChild');

  addScript(SCRIPT);

  expect(document.head.innerHTML).toContain(
    `<script id="${SCRIPT.id}" src="${SCRIPT.src}"></script>`,
  );
});
