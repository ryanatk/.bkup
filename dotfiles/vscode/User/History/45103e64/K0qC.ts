import inlineLiteral from '../inlineLiteral';

it('replaces multiple spaces with 1 space', () => {
  const result = inlineLiteral(`
    a      b
    c
    `);
  expect(result).toBe('a b c');
});
