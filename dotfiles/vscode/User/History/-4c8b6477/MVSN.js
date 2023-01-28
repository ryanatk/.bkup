import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen, configure } from '@testing-library/react';
import Hero from './index';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => ({ flags: {} })),
}));

jest.mock('../../../utils/checkFeatureFlag', () =>
  jest.fn().mockReturnValue(false),
);

configure({ testIdAttribute: 'data-cy' });

global.matchMedia = () => {
  return {
    addEventListener: () => true,
    removeEventListener: () => true,
  };
};

const props = {
  title: 'My testing title',
  text: 'My testing text',
  textColor: 'helsinkiBlue',
  buttonLabel: 'Test Button Label',
  buttonLink: 'https://google.com',
  buttonVariant: 'outlined',
  backgroundColor: 'livingCoral',
  imageSrc: '//via.placeholder.com/900x900',
  imagePosition: 'top',
};

const propVariants = {
  title: 'Another testing title',
  textColor: 'livingCoral',
  buttonVariant: 'filled-inverse',
  className: 'bg-sand-light',
};

describe('Hero Component', () => {
  test(`expect Hero to render title, text, and button`, () => {
    render(<Hero {...props} />);
    expect(screen.getByText(props.title)).toBeTruthy();
    expect(screen.getByText(props.text)).toBeTruthy();
    expect(screen.getByText(props.buttonLabel)).toBeTruthy();
    expect(screen.queryByTestId('hero-image')).toBeTruthy();
  });

  test(`expect Hero to render no text, and button`, () => {
    render(<Hero {...propVariants} />);
    expect(screen.getByText(propVariants.title)).toBeTruthy();
    expect(screen.queryByTestId('hero-text')).toBeNull();
    expect(screen.queryByTestId('hero-button')).toBeNull();
    expect(screen.queryByTestId('hero-image')).toBeNull();
  });

  test('Hero snapshot test', () => {
    const tree = renderer.create(<Hero {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Hero snapshot test with different prop variations', () => {
    const tree = renderer.create(<Hero {...propVariants} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
