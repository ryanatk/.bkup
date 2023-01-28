import { BORDER } from 'common/const';

const border = (theme) => ({
  [`.${BORDER.BLACK}`]: { borderColor: theme.palette.common.black },

  [`.${BORDER.WHITE}`]: { borderColor: theme.palette.common.white },
  [`.${BORDER.PRIMARY}`]: { borderColor: theme.palette.primary.main },
  [`.${BORDER.PRIMARY_LIGHT}`]: { borderColor: theme.palette.primary.light },
  [`.${BORDER.PRIMARY_DARK}`]: { borderColor: theme.palette.primary.dark },
  [`.${BORDER.PRIMARY_TEXT}`]: {
    borderColor: theme.palette.primary.contrastText,
  },
  [`.${BORDER.SECONDARY}`]: { borderColor: theme.palette.secondary.main },
  [`.${BORDER.SECONDARY_LIGHT}`]: {
    borderColor: theme.palette.secondary.light,
  },
  [`.${BORDER.SECONDARY_DARK}`]: { borderColor: theme.palette.secondary.dark },
  [`.${BORDER.SECONDARY_TEXT}`]: {
    borderColor: theme.palette.secondary.contrastText,
  },
  [`.${BORDER.ERROR}`]: { borderColor: theme.palette.error.main },
  [`.${BORDER.ERROR_LIGHT}`]: { borderColor: theme.palette.error.light },
  [`.${BORDER.ERROR_DARK}`]: { borderColor: theme.palette.error.dark },
  [`.${BORDER.ERROR_TEXT}`]: { borderColor: theme.palette.error.contrastText },
  [`.${BORDER.WARNING}`]: { borderColor: theme.palette.warning.main },
  [`.${BORDER.WARNING_LIGHT}`]: { borderColor: theme.palette.warning.light },
  [`.${BORDER.WARNING_DARK}`]: { borderColor: theme.palette.warning.dark },
  [`.${BORDER.WARNING_TEXT}`]: {
    borderColor: theme.palette.warning.contrastText,
  },
  [`.${BORDER.INFO}`]: { borderColor: theme.palette.info.main },
  [`.${BORDER.INFO_LIGHT}`]: { borderColor: theme.palette.info.light },
  [`.${BORDER.INFO_DARK}`]: { borderColor: theme.palette.info.dark },
  [`.${BORDER.INFO_TEXT}`]: { borderColor: theme.palette.info.contrastText },
  [`.${BORDER.SUCCESS}`]: { borderColor: theme.palette.success.main },
  [`.${BORDER.SUCCESS_LIGHT}`]: { borderColor: theme.palette.success.light },
  [`.${BORDER.SUCCESS_DARK}`]: { borderColor: theme.palette.success.dark },
  [`.${BORDER.SUCCESS_TEXT}`]: {
    borderColor: theme.palette.success.contrastText,
  },
  [`.${BORDER.GREY_50}`]: { borderColor: theme.palette.grey[50] },
  [`.${BORDER.GREY_100}`]: { borderColor: theme.palette.grey[100] },
  [`.${BORDER.GREY_200}`]: { borderColor: theme.palette.grey[200] },
  [`.${BORDER.GREY_300}`]: { borderColor: theme.palette.grey[300] },
  [`.${BORDER.GREY_400}`]: { borderColor: theme.palette.grey[400] },
  [`.${BORDER.GREY_500}`]: { borderColor: theme.palette.grey[500] },
  [`.${BORDER.GREY_600}`]: { borderColor: theme.palette.grey[600] },
  [`.${BORDER.GREY_700}`]: { borderColor: theme.palette.grey[700] },
  [`.${BORDER.GREY_800}`]: { borderColor: theme.palette.grey[800] },
  [`.${BORDER.GREY_900}`]: { borderColor: theme.palette.grey[900] },
  [`.${BORDER.GREY_A100}`]: { borderColor: theme.palette.grey.A100 },
  [`.${BORDER.GREY_A200}`]: { borderColor: theme.palette.grey.A200 },
  [`.${BORDER.GREY_A400}`]: { borderColor: theme.palette.grey.A400 },
  [`.${BORDER.GREY_A700}`]: { borderColor: theme.palette.grey.A700 },
  [`.${BORDER.TEXT}`]: { borderColor: theme.palette.text.primary },
  [`.${BORDER.TEXT_SECONDARY}`]: { borderColor: theme.palette.text.secondary },
  [`.${BORDER.TEXT_DISABLED}`]: { borderColor: theme.palette.text.disabled },
  [`.${BORDER.DIVIDER}`]: { borderColor: theme.palette.divider },
  [`.${BORDER.PAPER}`]: {
    borderColor: `${theme.palette.background.paper} !important`,
  },
  [`.${BORDER.BACKGROUND}`]: { borderColor: theme.palette.background.default },
  [`.${BORDER.ACTION_ACTIVE}`]: { borderColor: theme.palette.action.active },
  [`.${BORDER.ACTION_HOVER}`]: { borderColor: theme.palette.action.hover },
  [`.${BORDER.ACTION_SELECTED}`]: {
    borderColor: theme.palette.action.selected,
  },
  [`.${BORDER.ACTION_DISABLED}`]: {
    borderColor: theme.palette.action.disabled,
  },
  [`.${BORDER.ACTION_DISABLED_BACKGROUND}`]: {
    borderColor: theme.palette.action.disabledBackground,
  },
  [`.${BORDER.ACTION_FOCUS}`]: { borderColor: theme.palette.action.focus },
});

export default border;
