import preventScrolling from './preventScrolling';

describe('preventScrolling', () => {
  test('simulates click events', () => {
    const e = { stopPropagation: jest.fn() };
    const component = shallow(<ListItem {...props} />);
    const li = component.find('li').at(0).childAt(0);
    li.props().onClick(e);

    expect();
  });

  test('prevents default on click', () => {
    const { getByText } = render(<MyComponent />);
    const button = getByText(/click me/);

    // initialise an event, and assign your own preventDefault
    const clickEvent = new MouseEvent('click');
    Object.assign(clickEvent, { preventDefault: jest.fn() });

    fireEvent(button, clickEvent);

    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});
