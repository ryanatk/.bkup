import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TeaserBox from '../index';

it('Renders with content and functional help icon', () => {
  const mockHelpClick = jest.fn();

  const { container } = render(
    <TeaserBox
      title="This is the title"
      titleElement="h2"
      summary="This is the summary"
      onHelpClick={mockHelpClick}
    />,
  );

  const title = container.querySelector('h2');
  const summary = container.querySelector('div');
  const helpButton = container.querySelector('button');

  expect(title).toHaveTextContent('This is the title');
  expect(summary).toHaveTextContent('This is the summary');
  expect(helpButton).toBeVisible();

  helpButton.click();

  expect(mockHelpClick.mock.calls.length).toBe(1);
});
