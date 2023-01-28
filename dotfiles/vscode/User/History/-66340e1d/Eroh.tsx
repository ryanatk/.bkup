const HeaderOverlay = () => {
  return (
    <div
      className={cx(styles.offcanvasOverlay, {
        [styles['offcanvasOverlay--open']]: offcanvasOpen,
      })}
      aria-hidden="true"
      onClick={() => {
        setOffcanvasOpen(false);
      }}
    />
  );
};

export default HeaderOverlay;
