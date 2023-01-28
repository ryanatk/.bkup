import { Typography } from '../../../sormus';

const DescriptionItem = ({ icon, title, body }) => {
  return (
    <li>
      <div className="flex items-center">
        {/* TODO: icon */}
        <span>{icon}</span>

        <Typography Element="h4" variant="h5">
          {title}
        </Typography>
      </div>
    </li>
  );
};
