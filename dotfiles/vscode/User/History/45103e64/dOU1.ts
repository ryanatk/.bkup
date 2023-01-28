import inlineLiteral from '../inlineLiteral';

it('replaces multiple spaces with 1 space', () => {
  const result = inlineLiteral(`a     b c`);
  expect(result).toBe('a b c');
});

it('replaces new lines with 1 space', () => {
  const result = inlineLiteral(`a      
    b
    c`);
  expect(result).toBe('a b c');
});

it('trims spaces at beginning & end', () => {
  const result = inlineLiteral(` abc `);
  expect(result).toBe('abc');
});
