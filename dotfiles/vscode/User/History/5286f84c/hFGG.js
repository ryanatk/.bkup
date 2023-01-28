// props for external links
export const NEW_TAB = {
  rel: 'noreferrer',
  target: '_blank',
};

/**
 * Mui's Link & Button takes a component prop
 * We can determine that component from the other props
 * The component can also be overridden setting as a prop
 */
const getClickProps = ({ props = {}, RouterLink, BUTTON_TYPES }) => {
  // console.log('!getClickProps', { props });

  const isLink = Boolean(props.to);
  const isAnchor = Boolean(props.href);
  const isButton = Boolean(props.onClick || BUTTON_TYPES.includes(props.type));

  // console.log('!getClickProps', { isLink, isAnchor, isButton });

  if (isLink) {
    return { component: RouterLink, ...props };
  } else if (isAnchor) {
    return { component: 'a', ...NEW_TAB, ...props };
  } else if (isButton) {
    return { component: 'button', ...props };
  } else {
    return { component: 'span', ...props };
  }
};

export default getClickProps;
