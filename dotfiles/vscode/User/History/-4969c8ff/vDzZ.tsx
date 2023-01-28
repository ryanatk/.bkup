import { Typography } from '../../../sormus';

const DescriptionItem = ({ icon, title, body }) => {
  return (
    <li>
      <div>
        {/* TODO: icon */}

        <Typography Element="h4" variant="h5">
          {title}
        </Typography>
      </div>
    </li>
  );
};
