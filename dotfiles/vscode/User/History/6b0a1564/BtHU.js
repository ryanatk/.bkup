import toggleElement, { CACHED_PREFIX } from './toggleElement';

const ATTR_NAME = 'name';
const TOGGLED_VALUE = 'value';
const INITIAL_VALUE = 'initial';
const CACHED_ATTR_NAME = `${CACHED_PREFIX}-${ATTR_NAME}`;

const setup = (isHidden, value) => {
  const el = document.createElement('div');

  if (value) {
    if (isHidden) {
      // if hidden, add the initial value
      el.setAttribute(ATTR_NAME, value);
    } else {
      // if visible, add the cached value
      el.setAttribute(CACHED_ATTR_NAME, value);
    }
  }

  const toggledEl = toggleElement(el, isHidden, {
    NAME: ATTR_NAME,
    VALUE: TOGGLED_VALUE,
  });
  const attr = toggledEl.getAttribute(ATTR_NAME);
  const cached = toggledEl.getAttribute(CACHED_ATTR_NAME);

  return { attr, cached, el, toggledEl };
};

describe('Header util toggleElement:', () => {
  it('returns the same element', () => {
    const { el, toggledEl } = setup(true);

    expect(toggledEl.isEqualNode(el)).toBe(true);
  });

  describe('When element is hidden:', () => {
    const isHidden = true;

    it('Caches the initial attribute value', () => {
      const { cached } = setup(isHidden, INITIAL_VALUE);
      expect(cached).toBe(INITIAL_VALUE);
    });

    it('Does not cache when there was no initial value', () => {
      const { cached } = setup(isHidden);
      expect(cached).toBeNull();
    });

    it('Sets to the hidden value', () => {
      const { attr } = setup(isHidden);
      expect(attr).toBe(TOGGLED_VALUE);
    });
  });

  describe('When element is visible:', () => {
    const isHidden = false;

    it('Resets to initial value', () => {
      const { attr } = setup(isHidden, INITIAL_VALUE);
      expect(attr).toBe(INITIAL_VALUE);
    });

    it('Removes the hidden attribute when there was no initial value', () => {
      const { attr } = setup(isHidden);
      expect(attr).toBeNull();
    });
  });
});
