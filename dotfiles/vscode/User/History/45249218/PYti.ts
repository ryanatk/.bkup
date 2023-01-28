/** This ridiculous block is required for universal rendering not not blow up our initial image load */
const getWindow = () => {
  let windowScope = null;

  if (typeof window !== 'undefined') {
    windowScope = window;
  }

  return windowScope;
};

export default getWindow;
