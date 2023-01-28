import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

type SelectOptionArrayType = {
  value: string | number;
  label: string | JSX.Element;
};

interface SelectProps {
  /** label for select */
  label: string;
  hideLabel: boolean;
  /** current value for select */
  value: string | number | boolean;
  /** onchange handler */
  onChange: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    child: React.ReactNode,
  ) => void;
  /** name for form input */
  name: string;
  /** additional inputProps for the select */
  labelShrink?: boolean;
  /** list of options */
  options: string[] | number[] | SelectOptionArrayType[];
  /** option to hide label */
  hiddenLabel?: boolean;
  /** other props */
  [x: string]: any;
}

const Select = ({
  label,
  value,
  options,
  labelShrink,
  onChange,
  name,
  hiddenLabel = false,
  ...props
}: SelectProps): ReactElement => {
  const calculateWidth = () => {
    const size = label.length;
    return `${size}rem`;
  };

  const getMenuItem = (option) => {
    if (typeof option === 'object') {
      const { value, label } = option;
      const key = `option-${label}`;
      return (
        <MenuItem key={key} value={value} data-cy={key}>
          {label}
        </MenuItem>
      );
    }

    const key = `option-${option.toString()}`;

    return (
      <MenuItem key={key} value={option} data-cy={key}>
        {option.toString()}
      </MenuItem>
    );
  };

  return (
    <FormControl
      {...props}
      style={{ minWidth: calculateWidth(), ...props.style }}
    >
      {!hiddenLabel && (
        <InputLabel id={`${name}-label`} shrink={labelShrink}>
          {label}
        </InputLabel>
      )}
      <MUISelect
        labelId={`${name}-label`}
        inputProps={{ name, 'aria-label': label }}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => getMenuItem(option))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
