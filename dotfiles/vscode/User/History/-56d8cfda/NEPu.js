import { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';

import { ROUTE } from 'common/const';
import { Button } from 'common/components';
import { useDebounce } from 'common/hooks';

const ViewDetails = ({ order }) => {
  console.log('<View Details>');

  const [scrollTo, setScrollTo] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollTo(window.scrollY);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <Button
      text
      swap="caret-right"
      to={{
        pathname: `${ROUTE.ORDER_DETAILS}/${order.id}`,
        state: { scrollTo },
      }}
    >
      View Details
    </Button>
  );
};

ViewDetails.propTypes = {
  order: shape({
    id: string.isRequired,
  }),
};

export default ViewDetails;
