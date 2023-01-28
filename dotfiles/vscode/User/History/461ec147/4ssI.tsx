import { FormControlLabel, Radio } from '@material-ui/core';
import React from 'react';

export interface RadioButtonProps {
  /** value of button */
  value: string | number | boolean;
  /** label for button */
  label: string | React.ReactNode;
  /** additional props */
  [x: string]: any;
}

// export interface RadioButtonProps extends FormControlLabelProps {
//   /** value of button */
//   value: string | number | boolean;
//   /** label for button */
//   label: string | React.ReactNode;
//   /** additional props */
//   [x: string]: any;
// }

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  inputProps,
  ...props
}) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio inputProps={inputProps} />}
      label={label}
      {...props}
    />
  );
};

export default RadioButton;
