import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  id: string;
  values?: {
    [x: string]: string | ReactElement;
  };
}

const T = ({ id, values = {} }) => <FormattedMessage id={id} values={values} />;

export default T;
