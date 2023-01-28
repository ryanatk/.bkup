import getProps from './getProps';

const setup = () => {
  return getProps('EDLEN');
};

it('should return values for all props', () => {
  const props = setup();

  expect(props.HREF).toBeDefined();
  expect(props.PHONE).toBeDefined();
  expect(props.TITLE).toBeDefined();
});
