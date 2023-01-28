declare let affirm: any;

const affirmRefresh = () => {
  affirm.ui.ready(function () {
    affirm.ui.refresh();
  });
};

export default affirmRefresh;
