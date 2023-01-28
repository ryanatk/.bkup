import { bool, func, number } from 'prop-types';
import cx from 'classnames';

import { BACKGROUND, BORDER, COLOR, TEXT } from 'common/const';
import { QuantityButton, ClickOutside } from 'common/components';
import { useClick } from 'common/hooks';

import styles from './UpdateQuantity.module.css';

const UpdateQuantity = ({
  disabled,
  increment,
  isActive,
  setIsActive,
  quantity,
  onChange,
  onZero,
}) => {
  // console.log('<UpdateQuantity>', { isActive, quantity, onChange });
  const { onClick } = useClick({ onClick: () => setIsActive(true) });

  return isActive ? (
    <div className={styles.wrap}>
      <ClickOutside
        className={cx(styles.button, styles.dynamic)}
        onClick={() => setIsActive(false)}
        floating={true}
      >
        <QuantityButton
          onChange={onChange}
          number={quantity}
          increment={increment}
          onZero={onZero}
          className={COLOR.PRIMARY}
          textClass={cx(COLOR.TEXT, TEXT.SUBTITLE)}
        />
      </ClickOutside>
    </div>
  ) : (
    <button
      className={cx(styles.button, styles.static, {
        [BACKGROUND.PAPER]: !disabled,
        [COLOR.TEXT]: !disabled,
        [BORDER.GREY_400]: !disabled,
        [BACKGROUND.GREY_50]: disabled,
        [COLOR.GREY_600]: disabled,
        [BORDER.GREY_200]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {quantity}
    </button>
  );
};

UpdateQuantity.propTypes = {
  disabled: bool,
  increment: number,
  isActive: bool,
  setIsActive: func,
  quantity: number,
  onChange: func,
  onZero: func,
};

export default UpdateQuantity;
