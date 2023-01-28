const scroll = ({ x = 0, y = 0 }) => {
  const coords = position[to];
  const [x, y] = coords ? coords : to;

  window.scroll(x, y);
};

export default scroll;
