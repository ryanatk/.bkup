import { useMemo } from 'react';
import { array, bool, func, string } from 'prop-types';

import { makeOption } from 'common/utils';
import { AutoComplete, SearchInput } from 'common/components';

const Input = ({ value, options: list = [], onChange, submit, disabled }) => {
  // console.log('<Input>', { value, options: list });

  const options = useMemo(
    () => list.map((option) => makeOption(option)),
    [list],
  );

  return (
    <AutoComplete
      selectOnFocus={true}
      label=""
      value={value ? makeOption(value) : ''}
      options={options}
      onInputChange={(e, value) => onChange(value)}
      onBlur={(event) => {
        const value = event?.target?.value;

        if (value !== undefined) {
          onChange(value);
          submit({ value });
        }
      }}
      onChange={({ value }) => {
        onChange(value);
        submit({ value });
      }}
      name="search-value"
      InputComponent={SearchInput}
      getInputProps={({ inputProps, ...rest }) => ({
        ...rest,
        label: 'Search Events',
        inputProps: {
          ...inputProps,
          autoComplete: 'off',
          placeholder: 'Enter event name, venue, location or event ID',
          // stop the dropdown from opening onClick of the input
          onMouseDownCapture: (e) => e.stopPropagation(),
        },
      })}
      helperText="" // remove space underneath
      autoFocus
      freeSolo
      disableClearable
      forcePopupIcon={false}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  disabled: bool,
  onChange: func,
  options: array,
  submit: func,
  value: string,
};

export default Input;
