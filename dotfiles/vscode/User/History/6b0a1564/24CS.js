import toggleElementAttr, { CACHED_PREFIX } from './toggleElementAttr';

const ATTR_NAME = 'name'; // i.e. `tabindex` or `aria-hidden`
const TOGGLED_VALUE = 'value';
const ORIGINAL_VALUE = 'original';
const CACHED_ATTR_NAME = `${CACHED_PREFIX}-${ATTR_NAME}`;

const setup = (isToggled, value) => {
  const originalEl = document.createElement('div');

  if (value) {
    if (isToggled) {
      // if hidden, add the original value
      originalEl.setAttribute(ATTR_NAME, value);
    } else {
      // if visible, add the cached value
      originalEl.setAttribute(CACHED_ATTR_NAME, value);
    }
  }

  const { element } = toggleElementAttr(originalEl, isToggled, {
    NAME: ATTR_NAME,
    VALUE: TOGGLED_VALUE,
  });
  const attr = element.getAttribute(ATTR_NAME);
  const cached = element.getAttribute(CACHED_ATTR_NAME);

  return { attr, cached, originalEl, element };
};

describe('Header util toggleElementAttr:', () => {
  it('Returns the same element', () => {
    const { originalEl, element } = setup(true);

    expect(element.isEqualNode(originalEl)).toBe(true);
  });

  describe('When element is hidden:', () => {
    const isToggled = true;

    it('Caches the original attribute value', () => {
      const { cached } = setup(isToggled, ORIGINAL_VALUE);
      expect(cached).toBe(ORIGINAL_VALUE);
    });

    it('Does not cache when there was no initial value', () => {
      const { cached } = setup(isToggled);
      expect(cached).toBeNull();
    });

    it('Does not cache when there was already a cached attr', () => {
      const testValue = 'test';
      const { cached } = setup(isToggled, testValue);
      expect(cached).toBe(testValue);
    });

    it('Sets to the hidden value', () => {
      const { attr } = setup(isToggled);
      expect(attr).toBe(TOGGLED_VALUE);
    });
  });

  describe('When element is not toggled:', () => {
    const isToggled = false;

    it('Resets to initial value', () => {
      const { attr } = setup(isToggled, ORIGINAL_VALUE);
      expect(attr).toBe(ORIGINAL_VALUE);
    });

    it('Removes the hidden attribute when there was no initial value', () => {
      const { attr } = setup(isToggled);
      expect(attr).toBeNull();
    });
  });
});
