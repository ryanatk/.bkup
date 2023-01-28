import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { FC, ReactElement } from 'react';
import { Typography } from '../index';

export interface CheckboxProps {
  label: ReactElement | string;
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  checked?: boolean;
  onChange: () => void;
  disabled?: boolean;
  name: string;
  [x: string]: any;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  labelPlacement = 'end',
  checked = false,
  onChange,
  name,
  disabled = false,
  checkboxProps,
  ...props
}) => (
  <FormGroup {...props}>
    <FormControlLabel
      control={
        <MUICheckbox
          data-cy={`checkbox-${name}`}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
      }
      label={<Typography color="inherit">{label}</Typography>}
      labelPlacement={labelPlacement}
    />
  </FormGroup>
);

export default Checkbox;
