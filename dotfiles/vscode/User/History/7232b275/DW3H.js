import {
  InlineIcon,
  IslandIcon,
  PeninsulaIcon,
  UnsureIcon,
} from 'assets/images';

const BOOTH_TYPE = {
  INLINE: {
    title: 'Inline',
    value: 'Inline',
    description:
      'Located in a straight line alongside a number of other booths in an aisle. Only one side is open to the aisle.',
    image: InlineIcon,
  },
  PENINSULA: {
    title: 'Peninsula',
    value: 'Peninsula',
    description:
      'Located at the end of an aisle and accessible from three sides with its back against another booth. Also referred to as an End-Cap.',
    image: PeninsulaIcon,
  },
  ISLAND: {
    title: 'Island',
    value: 'Island',
    description:
      'Booth exposed to aisles on all four sides with no adjacent booths.',
    image: IslandIcon,
  },
  UNSURE: {
    title: 'Not Sure / Not Listed',
    value: 'Do Not Know',
    image: UnsureIcon,
  },
};

export default BOOTH_TYPE;
