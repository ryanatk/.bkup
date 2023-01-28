import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('simulates click events', () => {
    const e = { stopPropagation: jest.fn() };
    const component = shallow(<ListItem {...props} />);
    const li = component.find('li').at(0).childAt(0);
    li.props().onClick(e);

    expect();
  });
});
