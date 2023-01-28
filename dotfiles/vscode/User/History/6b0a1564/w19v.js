import toggleElement, { CACHED_PREFIX } from './toggleElement';

const NAME = 'name';
const VALUE = 'value';
const INITIAL_VALUE = 'initial';
const CACHED_ATTR = `${CACHED_PREFIX}-${NAME}`;

const setup = (isHidden, value) => {
  const el = document.createElement('div');

  if (value) {
    if (isHidden) {
      // if hidden, add the initial value
      el.setAttribute(NAME, value);
    } else {
      // if visible, add the cached value
      el.setAttribute(CACHED_ATTR, value);
    }
  }

  const toggledEl = toggleElement(el, isHidden, { NAME, VALUE });
  const cached = toggledEl.getAttribute(CACHED_ATTR);
  const value = toggledEl.getAttribute(NAME);

  return { cached, el, toggledEl, value };
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
      const { value } = setup(isHidden);
      expect(value).toBe(VALUE);
    });
  });

  describe('When element is visible:', () => {
    const isHidden = false;

    it('Resets to initial value', () => {
      const { value } = setup(isHidden, INITIAL_VALUE);
      expect(value).toBe(INITIAL_VALUE);
    });

    it('Removes the hidden attribute when there was no initial value', () => {
      const { value } = setup(isHidden);
      expect(value).toBeNull();
    });
  });
});
