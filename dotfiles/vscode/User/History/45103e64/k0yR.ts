import inlineLiteral from '../inlineLiteral';

it('replaces multiple spaces with 1 space', () => {
  const result = inlineLiteral(`a     b c`);
  expect(result).toBe('a b c');
});

it('trims new lines', () => {
  const result = inlineLiteral(`a      
b
c
`);
  expect(result).toBe('abc');
});

it('trims spaces at beginning & end', () => {
  const result = inlineLiteral(` abc `);
  expect(result).toBe('abc');
});
