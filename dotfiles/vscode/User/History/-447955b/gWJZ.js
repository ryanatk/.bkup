import { useEffect } from 'react';
import { object, string } from 'prop-types';
import cx from 'classnames';
import { v4 } from 'uuid';

import { useAddress } from 'common/hooks';

import styles from './AddressDisplay.module.css';

const AddressDisplay = ({ address = {}, className, displayPhone }) => {
  const { countryCode } = address;
  const { DISPLAY, FIELD, updateCountry, findCountry } = useAddress({
    countryCode,
  });
  // console.log('<AddressDisplay>', { address, DISPLAY });

  useEffect(
    () => (countryCode ? updateCountry(countryCode) : null),
    [countryCode, updateCountry],
  );

  // help react with re-renders
  const key = v4();

  if (!Object.values(address).length) {
    return null;
  }

  const getValue = (field) => {
    switch (field) {
      case 'country':
        return findCountry(address.countryCode)?.label ?? '';
      default:
        return address[field];
    }
  };

  return (
    <address className={className}>
      <ol className={styles.address}>
        {DISPLAY.fields.map((line, i) => {
          return (
            <li key={key + 'line' + i} className={styles.line}>
              {line.map((field) => {
                const value = getValue(field);

                return value ? (
                  <span
                    key={key + 'value' + field + value}
                    className={cx(styles.value, DISPLAY.styles[field])}
                    aria-label={FIELD[field]?.label ?? field}
                  >
                    {value}
                  </span>
                ) : null;
              })}
            </li>
          );
        })}
        {displayPhone && (
          <li key={'phone'} className={styles.line}>
            {address.phone}
          </li>
        )}
      </ol>
    </address>
  );
};

AddressDisplay.propTypes = {
  address: object,
  className: string,
};

AddressDisplay.defaultProps = {};

export default AddressDisplay;
