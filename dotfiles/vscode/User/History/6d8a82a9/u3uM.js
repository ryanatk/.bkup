import React from 'react';
import Typography from './index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';

jest.mock('../../../utils/checkFeatureFlag');

const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const colors = ['helsinkiBlue', 'sand', 'sand-light', 'helsinkiBlue-dark'];
const defaultColor = 'helsinkiBlue-dark';

const alignment = ['left', 'center', 'right'];

const elements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'dt',
  'dd',
  'p',
  'ul',
  'li',
  'span',
  'strong',
  'em',
];

const weights = [
  'thin',
  'extralight',
  'light',
  'normal',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
];

const lineHeights = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'];

beforeEach(() => {
  checkFeatureFlag.mockReturnValue(false);
});

colors.forEach((color) => {
  test(`expect color prop ${color} adds color class as expected`, () => {
    const text = `Testing my ${color} text.`;
    render(<Typography color={color}>{text}</Typography>);
    expect(screen.getByText(text)).toHaveClass(`text-${color}`);
  });
});

alignment.forEach((align) => {
  test(`expect align prop ${align} adds alignment class as expected`, () => {
    const text = `Testing my ${align} text.`;
    render(<Typography align={align}>{text}</Typography>);
    expect(screen.getByText(text)).toHaveClass(`text-${align}`);
  });
});

elements.forEach((elem) => {
  test(`expect Element prop ${elem} marks the type up as expected`, () => {
    const text = `Testing this ${elem}.`;
    const { container } = render(
      <Typography Element={elem}>{text}</Typography>,
    );
    const domElem = container.querySelector(elem);
    expect(domElem).toBeTruthy();
  });
});

test('expect default element to be a paragraph', () => {
  const text = 'Testing a paragraph.';
  const { container } = render(<Typography>{text}</Typography>);
  const domElem = container.querySelector('p');
  expect(domElem).toBeTruthy();
});

lineHeights.forEach((height) => {
  test(`expect height prop ${height} adds leading class as expected`, () => {
    const text = `Testing my ${height} text.`;
    render(<Typography height={height}>{text}</Typography>);
    expect(screen.getByText(text)).toHaveClass(`leading-${height}`);
  });
});

weights.forEach((weight) => {
  test(`expect weight prop ${weight} adds line-weight class as expected`, () => {
    const text = `Testing my ${weight} text.`;
    render(<Typography weight={weight}>{text}</Typography>);
    expect(screen.getByText(text)).toHaveClass(`font-${weight}`);
  });
});

test('expect className to append to classes', () => {
  const text = 'Testing my extra classes.';
  render(<Typography className="my-new-class">{text}</Typography>);
  expect(screen.getByText(text)).toHaveClass(
    `text-${defaultColor} my-new-class`,
  );
});

test('expect a combination of props to render correctly', () => {
  const text = 'Testing all the props.';
  const { container } = render(
    <Typography
      Element="h3"
      variant="subhead2"
      color="sand"
      height="relaxed"
      weight="black"
      className="my-class-name"
    >
      {text}
    </Typography>,
  );
  expect(screen.getByText(text)).toHaveClass(
    'text-sand leading-relaxed font-black my-class-name',
  );
  const domElem = container.querySelector('h3');
  expect(domElem).toBeTruthy();
});

headingVariants.forEach((variant) => {
  test(`expect heading variant ${variant} leading to be overridden by explicit prop`, () => {
    const text = 'Testing header leading.';
    render(
      <Typography variant={variant} height="relaxed">
        {text}
      </Typography>,
    );
    expect(screen.getByText(text)).toHaveClass('leading-relaxed');
  });
});

test('expect default color to be helsinkiBlue', () => {
  const text = `Testing default color.`;
  render(<Typography>{text}</Typography>);
  expect(screen.getByText(text)).toHaveClass(`text-helsinkiBlue`);
});

test('expect default color to be helsinkiBlue-dark with horizon enabled', () => {
  checkFeatureFlag.mockReturnValue(true);
  const text = `Testing default color.`;
  render(<Typography>{text}</Typography>);
  expect(screen.getByText(text)).toHaveClass(`text-helsinkiBlue-dark`);
});
