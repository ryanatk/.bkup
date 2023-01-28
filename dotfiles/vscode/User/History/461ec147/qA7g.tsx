import { FormControlLabel, Radio } from '@material-ui/core';
import React from 'react';

export interface RadioButtonProps {
  /** value of button */
  value: string | number | boolean;
  /** label for button */
  label: string | React.ReactNode;
  /** for a11y */
  ariaLabel?: string;
  /** additional props */
  [x: string]: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  ariaLabel,
  ...props
}) => {
  const { inputProps, ...rest } = props ?? {};

  return (
    <FormControlLabel
      value={value}
      control={
        <Radio inputProps={{ ...inputProps, 'aria-label': ariaLabel }} />
      }
      label={label}
      {...rest}
    />
  );
};

export default RadioButton;
