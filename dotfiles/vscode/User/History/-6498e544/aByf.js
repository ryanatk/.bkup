import { BACKGROUND } from 'common/const';

const background = (theme) => ({
  [`.${BACKGROUND.BLACK}`]: { backgroundColor: theme.palette.common.black },
  [`.${BACKGROUND.WHITE}`]: { backgroundColor: theme.palette.common.white },
  [`.${BACKGROUND.PRIMARY}`]: { backgroundColor: theme.palette.primary.main },
  [`.${BACKGROUND.PRIMARY_LIGHT}`]: {
    backgroundColor: theme.palette.primary.light,
  },
  [`.${BACKGROUND.PRIMARY_DARK}`]: {
    backgroundColor: theme.palette.primary.dark,
  },
  [`.${BACKGROUND.PRIMARY_TEXT}`]: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  [`.${BACKGROUND.SECONDARY}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`.${BACKGROUND.SECONDARY_LIGHT}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
  [`.${BACKGROUND.SECONDARY_DARK}`]: {
    backgroundColor: theme.palette.secondary.dark,
  },
  [`.${BACKGROUND.SECONDARY_TEXT}`]: {
    backgroundColor: theme.palette.secondary.contrastText,
  },
  [`.${BACKGROUND.ERROR}`]: { backgroundColor: theme.palette.error.main },
  [`.${BACKGROUND.ERROR_LIGHT}`]: {
    backgroundColor: theme.palette.error.light,
  },
  [`.${BACKGROUND.ERROR_DARK}`]: { backgroundColor: theme.palette.error.dark },
  [`.${BACKGROUND.ERROR_TEXT}`]: {
    backgroundColor: theme.palette.error.contrastText,
  },
  [`.${BACKGROUND.WARNING}`]: { backgroundColor: theme.palette.warning.main },
  [`.${BACKGROUND.WARNING_LIGHT}`]: {
    backgroundColor: theme.palette.warning.light,
  },
  [`.${BACKGROUND.WARNING_DARK}`]: {
    backgroundColor: theme.palette.warning.dark,
  },
  [`.${BACKGROUND.WARNING_TEXT}`]: {
    backgroundColor: theme.palette.warning.contrastText,
  },
  [`.${BACKGROUND.INFO}`]: { backgroundColor: theme.palette.info.main },
  [`.${BACKGROUND.INFO_LIGHT}`]: { backgroundColor: theme.palette.info.light },
  [`.${BACKGROUND.INFO_DARK}`]: { backgroundColor: theme.palette.info.dark },
  [`.${BACKGROUND.INFO_TEXT}`]: {
    backgroundColor: theme.palette.info.contrastText,
  },
  [`.${BACKGROUND.SUCCESS}`]: { backgroundColor: theme.palette.success.main },
  [`.${BACKGROUND.SUCCESS_LIGHT}`]: {
    backgroundColor: theme.palette.success.light,
  },
  [`.${BACKGROUND.SUCCESS_DARK}`]: {
    backgroundColor: theme.palette.success.dark,
  },
  [`.${BACKGROUND.SUCCESS_TEXT}`]: {
    backgroundColor: theme.palette.success.contrastText,
  },
  [`.${BACKGROUND.GREY_50}`]: { backgroundColor: theme.palette.grey[50] },
  [`.${BACKGROUND.GREY_100}`]: { backgroundColor: theme.palette.grey[100] },
  [`.${BACKGROUND.GREY_200}`]: { backgroundColor: theme.palette.grey[200] },
  [`.${BACKGROUND.GREY_300}`]: { backgroundColor: theme.palette.grey[300] },
  [`.${BACKGROUND.GREY_400}`]: { backgroundColor: theme.palette.grey[400] },
  [`.${BACKGROUND.GREY_500}`]: { backgroundColor: theme.palette.grey[500] },
  [`.${BACKGROUND.GREY_600}`]: { backgroundColor: theme.palette.grey[600] },
  [`.${BACKGROUND.GREY_700}`]: { backgroundColor: theme.palette.grey[700] },
  [`.${BACKGROUND.GREY_800}`]: { backgroundColor: theme.palette.grey[800] },
  [`.${BACKGROUND.GREY_900}`]: { backgroundColor: theme.palette.grey[900] },
  [`.${BACKGROUND.GREY_A100}`]: { backgroundColor: theme.palette.grey.A100 },
  [`.${BACKGROUND.GREY_A200}`]: { backgroundColor: theme.palette.grey.A200 },
  [`.${BACKGROUND.GREY_A400}`]: { backgroundColor: theme.palette.grey.A400 },
  [`.${BACKGROUND.GREY_A700}`]: { backgroundColor: theme.palette.grey.A700 },
  [`.${BACKGROUND.TEXT}`]: { backgroundColor: theme.palette.text.primary },
  [`.${BACKGROUND.TEXT_SECONDARY}`]: {
    backgroundColor: theme.palette.text.secondary,
  },
  [`.${BACKGROUND.TEXT_DISABLED}`]: {
    backgroundColor: theme.palette.text.disabled,
  },
  [`.${BACKGROUND.DIVIDER}`]: { backgroundColor: theme.palette.divider },
  [`.${BACKGROUND.PAPER}`]: {
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
  [`.${BACKGROUND.BACKGROUND}`]: {
    backgroundColor: theme.palette.background.default,
  },
  [`.${BACKGROUND.ACTION_ACTIVE}`]: {
    backgroundColor: theme.palette.action.active,
  },
  [`.${BACKGROUND.ACTION_HOVER}`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`.${BACKGROUND.ACTION_SELECTED}`]: {
    backgroundColor: theme.palette.action.selected,
  },
  [`.${BACKGROUND.ACTION_DISABLED}`]: {
    backgroundColor: theme.palette.action.disabled,
  },
  [`.${BACKGROUND.ACTION_DISABLED_BACKGROUND}`]: {
    backgroundColor: theme.palette.action.disabledBackground,
  },
  [`.${BACKGROUND.ACTION_FOCUS}`]: {
    backgroundColor: theme.palette.action.focus,
  },

  // Custom colors
  [`.${BACKGROUND.HEADER}`]: {
    backgroundColor: theme.header?.background ?? theme.palette.background.paper,
  },
  [`.${BACKGROUND.HEADER_BUTTON}`]: {
    backgroundColor:
      theme.header?.button?.background ?? theme.palette.primary.main,
  },
  [`.${BACKGROUND.BOOTH_PACKAGE}`]: {
    backgroundColor: theme.palette.boothPackage.main,
  },
  [`.${BACKGROUND.BOOTH_PACKAGE_LIGHT}`]: {
    backgroundColor: theme.palette.boothPackage.light,
  },
  [`.${BACKGROUND.BOOTH_PACKAGE_DARK}`]: {
    backgroundColor: theme.palette.boothPackage.dark,
  },
  [`.${BACKGROUND.BOOTH_PACKAGE_TEXT}`]: {
    backgroundColor: theme.palette.boothPackage.contrastText,
  },
  [`.${BACKGROUND.POWER_PACKAGE}`]: {
    backgroundColor: theme.palette.powerPackage.main,
  },
  [`.${BACKGROUND.POWER_PACKAGE_LIGHT}`]: {
    backgroundColor: theme.palette.powerPackage.light,
  },
  [`.${BACKGROUND.POWER_PACKAGE_DARK}`]: {
    backgroundColor: theme.palette.powerPackage.dark,
  },
  [`.${BACKGROUND.POWER_PACKAGE_TEXT}`]: {
    backgroundColor: theme.palette.powerPackage.contrastText,
  },
});

export default background;
