import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { screen, render, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

configure({ testIdAttribute: 'data-cy' });

const mockFn = jest.fn();

describe('Button Component', () => {
  test(`expect Button to render props and fire onClick`, () => {
    const { getByRole } = render(
      <Button variant="secondary" onClick={mockFn}>
        Test Me
      </Button>,
    );
    expect(mockFn.mock.calls.length).toEqual(0);
    userEvent.click(getByRole('button'));
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  test('expect Button to render as link when passed', () => {
    const { getByRole } = render(
      <Button variant="basic" link href="https://google.com">
        Link to Google
      </Button>,
    );
    expect(getByRole('link')).toBeTruthy();
  });

  test('expect Button to render loading when passed', () => {
    const { getByRole } = render(
      <Button loading onClick={mockFn}>
        Loading
      </Button>,
    );
    expect(getByRole('button')).toHaveAttribute('disabled');
    expect(screen.queryByTestId('button-loading')).toBeTruthy();
  });

  test('Button snapshot tests', () => {
    const primaryDefault = renderer
      .create(<Button>Primary Default</Button>)
      .toJSON();
    expect(primaryDefault).toMatchSnapshot();

    const primary = renderer
      .create(<Button variant="primary">Primary</Button>)
      .toJSON();
    expect(primary).toMatchSnapshot();

    const secondary = renderer
      .create(<Button variant="secondary">Secondary</Button>)
      .toJSON();
    expect(secondary).toMatchSnapshot();

    const tertiary = renderer
      .create(<Button variant="tertiary">Tertiary</Button>)
      .toJSON();
    expect(tertiary).toMatchSnapshot();

    const ghost = renderer
      .create(<Button variant="ghost">Ghost</Button>)
      .toJSON();
    expect(ghost).toMatchSnapshot();

    const basic = renderer
      .create(<Button variant="basic">Basic</Button>)
      .toJSON();
    expect(basic).toMatchSnapshot();

    const linkButton = renderer.create(
      <Button variant="basic" link href="https://google.com">
        Link to Google
      </Button>,
    );
    expect(linkButton).toMatchSnapshot();
  });
});
