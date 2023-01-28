import { COLOR } from 'common/const';

const color = (theme) => ({
  [`.${COLOR.BLACK}`]: { color: theme.palette.common.black },
  [`.${COLOR.WHITE}`]: { color: theme.palette.common.white },
  [`.${COLOR.PRIMARY}`]: { color: theme.palette.primary.main },
  [`.${COLOR.PRIMARY_LIGHT}`]: { color: theme.palette.primary.light },
  [`.${COLOR.PRIMARY_DARK}`]: { color: theme.palette.primary.dark },
  [`.${COLOR.PRIMARY_TEXT}`]: { color: theme.palette.primary.contrastText },
  [`.${COLOR.SECONDARY}`]: { color: theme.palette.secondary.main },
  [`.${COLOR.SECONDARY_LIGHT}`]: { color: theme.palette.secondary.light },
  [`.${COLOR.SECONDARY_DARK}`]: { color: theme.palette.secondary.dark },
  [`.${COLOR.SECONDARY_TEXT}`]: { color: theme.palette.secondary.contrastText },
  [`.${COLOR.ERROR}`]: { color: theme.palette.error.main },
  [`.${COLOR.ERROR_LIGHT}`]: { color: theme.palette.error.light },
  [`.${COLOR.ERROR_DARK}`]: { color: theme.palette.error.dark },
  [`.${COLOR.ERROR_TEXT}`]: { color: theme.palette.error.contrastText },
  [`.${COLOR.WARNING}`]: { color: theme.palette.warning.main },
  [`.${COLOR.WARNING_LIGHT}`]: { color: theme.palette.warning.light },
  [`.${COLOR.WARNING_DARK}`]: { color: theme.palette.warning.dark },
  [`.${COLOR.WARNING_TEXT}`]: { color: theme.palette.warning.contrastText },
  [`.${COLOR.INFO}`]: { color: theme.palette.info.main },
  [`.${COLOR.INFO_LIGHT}`]: { color: theme.palette.info.light },
  [`.${COLOR.INFO_DARK}`]: { color: theme.palette.info.dark },
  [`.${COLOR.INFO_TEXT}`]: { color: theme.palette.info.contrastText },
  [`.${COLOR.SUCCESS}`]: { color: theme.palette.success.main },
  [`.${COLOR.SUCCESS_LIGHT}`]: { color: theme.palette.success.light },
  [`.${COLOR.SUCCESS_DARK}`]: { color: theme.palette.success.dark },
  [`.${COLOR.SUCCESS_TEXT}`]: { color: theme.palette.success.contrastText },
  [`.${COLOR.GREY_50}`]: { color: theme.palette.grey[50] },
  [`.${COLOR.GREY_100}`]: { color: theme.palette.grey[100] },
  [`.${COLOR.GREY_200}`]: { color: theme.palette.grey[200] },
  [`.${COLOR.GREY_300}`]: { color: theme.palette.grey[300] },
  [`.${COLOR.GREY_400}`]: { color: theme.palette.grey[400] },
  [`.${COLOR.GREY_500}`]: { color: theme.palette.grey[500] },
  [`.${COLOR.GREY_600}`]: { color: theme.palette.grey[600] },
  [`.${COLOR.GREY_700}`]: { color: theme.palette.grey[700] },
  [`.${COLOR.GREY_800}`]: { color: theme.palette.grey[800] },
  [`.${COLOR.GREY_900}`]: { color: theme.palette.grey[900] },
  [`.${COLOR.GREY_A100}`]: { color: theme.palette.grey.A100 },
  [`.${COLOR.GREY_A200}`]: { color: theme.palette.grey.A200 },
  [`.${COLOR.GREY_A400}`]: { color: theme.palette.grey.A400 },
  [`.${COLOR.GREY_A700}`]: { color: theme.palette.grey.A700 },
  [`.${COLOR.TEXT}`]: { color: theme.palette.text.primary },
  [`.${COLOR.TEXT_SECONDARY}`]: { color: theme.palette.text.secondary },
  [`.${COLOR.TEXT_DISABLED}`]: { color: theme.palette.text.disabled },
  [`.${COLOR.DIVIDER}`]: { color: theme.palette.divider },
  [`.${COLOR.PAPER}`]: { color: theme.palette.background.paper },
  [`.${COLOR.BACKGROUND}`]: { color: theme.palette.background.default },
  [`.${COLOR.ACTION_ACTIVE}`]: { color: theme.palette.action.active },
  [`.${COLOR.ACTION_HOVER}`]: { color: theme.palette.action.hover },
  [`.${COLOR.ACTION_SELECTED}`]: { color: theme.palette.action.selected },
  [`.${COLOR.ACTION_DISABLED}`]: { color: theme.palette.action.disabled },
  [`.${COLOR.ACTION_DISABLED_BACKGROUND}`]: {
    color: theme.palette.action.disabledBackground,
  },
  [`.${COLOR.ACTION_FOCUS}`]: { color: theme.palette.action.focus },

  // Custom colors
  [`.${COLOR.HEADER}`]: {
    color: theme.header?.text ?? theme.palette.primary.main,
  },
  [`.${COLOR.HEADER_BUTTON}`]: {
    color: theme.header?.button?.text ?? theme.palette.primary.contrastText,
  },
  [`.${COLOR.BOOTH_PACKAGE}`]: {
    color: theme.palette.boothPackage.main,
  },
  [`.${COLOR.BOOTH_PACKAGE_LIGHT}`]: {
    color: theme.palette.boothPackage.light,
  },
  [`.${COLOR.BOOTH_PACKAGE_DARK}`]: {
    color: theme.palette.boothPackage.dark,
  },
  [`.${COLOR.BOOTH_PACKAGE_TEXT}`]: {
    color: theme.palette.boothPackage.contrastText,
  },
  [`.${COLOR.POWER_PACKAGE}`]: {
    color: theme.palette.powerPackage.main,
  },
  [`.${COLOR.POWER_PACKAGE_LIGHT}`]: {
    color: theme.palette.powerPackage.light,
  },
  [`.${COLOR.POWER_PACKAGE_DARK}`]: {
    color: theme.palette.powerPackage.dark,
  },
  [`.${COLOR.POWER_PACKAGE_TEXT}`]: {
    color: theme.palette.powerPackage.contrastText,
  },
});

export default color;
