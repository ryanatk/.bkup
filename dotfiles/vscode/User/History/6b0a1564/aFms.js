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

  const returned = toggleElement(el, isHidden, {
    NAME,
    VALUE,
  });
  const attr = returned.getAttribute(NAME);
  const cached = returned.getAttribute(CACHED_ATTR);

  return { attr, cached, el, returned };
};

describe('Header util toggleElement:', () => {
  it('returns the same element', () => {
    const { el, returned } = setup(true);

    expect(returned.isEqualNode(el)).toBe(true);
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
      expect(attr).toBe(VALUE);
    });
  });

  describe('When element is visible:', () => {
    const isHidden = false;

    it('Resets to original value', () => {
      const { cached } = setup(isHidden, INITIAL_VALUE);
      expect(cached).toBe(INITIAL_VALUE);
    });

    it('Does not cache when there was no initial value', () => {
      const { cached } = setup(isHidden);
      expect(cached).toBeNull();
    });

    it('Sets to the hidden value', () => {
      const { attr } = setup(isHidden);
      expect(attr).toBe(VALUE);
    });
  });
});
