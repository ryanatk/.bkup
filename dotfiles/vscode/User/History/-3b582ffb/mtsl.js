import { useCallback, useEffect, useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';

import { AutoComplete, Input } from 'common/components';
import { getStates } from 'data/lookup';
import { makeOption } from 'common/utils';

/**
 * TODO
 *
 * This is not working as an AutoComplete.
 * It (correctly) logs errors when the country is changed.
 *
 * It did not work as a Select.
 * It logs warnings when the country is changed,
 * when the defaultValue was not found in the options.
 *
 * We have replaced this with an Input, on all forms.
 *
 * Fix this component using Select instead of AutoComplete,
 * and update all forms to use this again.
 */

const StateInput = ({
  country,
  options,
  label,
  name,
  error,
  helperText,
  defaultValue,
  onChange,
  ...rest
}) => {
  // console.log('<StatesInput>', { country, options, label, name, error, helperText, defaultValue });

  const [states, setStates] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);

  const getOptions = useCallback(async () => {
    const options = await getStates(country);

    if (!isCanceled) {
      setStates(options);
    }
  }, [country, isCanceled]);

  useEffect(() => {
    setIsCanceled(false);

    if (options) {
      setStates(options);
    } else if (country) {
      getOptions();
    }

    // cancel when the country changes, in case responses don't return in order
    return () => setIsCanceled(true);
  }, [country, getOptions, options]);

  return states.length ? (
    <AutoComplete
      {...rest}
      label={label}
      name={name}
      options={states}
      matchFromStart={true}
      defaultValue={defaultValue ? makeOption(defaultValue) : defaultValue}
      error={Boolean(error)}
      helperText={error ?? helperText}
      disableClearable
      freeSolo
      forcePopupIcon
      onChange={({ value }) => {
        onChange(value);
      }}
    />
  ) : (
    <Input
      {...rest}
      label={label}
      name={name}
      defaultValue={defaultValue}
      error={error}
      helperText={error ?? helperText}
      onChange={({ target }) => {
        onChange(target.value);
      }}
    />
  );
};

StateInput.propTypes = {
  country: number,
  defaultValue: string,
  label: string,
  name: string.isRequired,
  options: arrayOf(
    shape({
      label: string,
      value: string,
    }),
  ),
  onChange: func,
};

StateInput.defaultProps = {};

export default StateInput;
