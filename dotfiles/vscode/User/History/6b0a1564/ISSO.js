import toggleElement, { CACHED_PREFIX } from './toggleElement';

const NAME = 'name';
const VALUE = 'value';
const ATTR = {
  NAME,
  VALUE,
};
const INITIAL_VALUE = 'initial';
const CACHED_ATTR = `${CACHED_PREFIX}-${NAME}`;

const setup = (isHidden, value) => {
  const el = document.createElement('div');

  if (value) {
    el.setAttribute(NAME, value);
  }

  const returned = toggleElement(el, isHidden, ATTR);
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

    it('caches the initial attribute value', () => {
      const { cached } = setup(isHidden, INITIAL_VALUE);
      expect(cached).toBe(INITIAL_VALUE);
    });

    it('does not cache when there was no initial value', () => {
      const { cached } = setup(isHidden);
      expect(cached).toBeNull();
    });

    it('sets to the hidden value', () => {
      const { attr } = setup(isHidden);
      expect(attr).toBe(VALUE);
    });
  });

  describe('When element is visible:', () => {
    it('removes the existing attribute', () => {
      const el = document.createElement('div');
      el.setAttribute(NAME, VALUE);

      const returned = toggleElement(el, true, ATTR);
      const attr = returned.getAttribute(NAME);

      expect(attr).toBeNull();
    });

    it('caches the existing attribute', () => {
      const el = document.createElement('div');
      el.setAttribute(NAME, VALUE);

      const returned = toggleElement(el, true, ATTR);
      console.log(returned.getAttribute(CACHED_ATTR));
      const attr = returned.getAttribute(CACHED_ATTR);

      expect(attr).toBe(VALUE);
    });
  });
});
