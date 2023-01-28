import toggleElementAttr, { getDataAttr } from './toggleElementAttr';

const ATTR_NAME = 'name'; // i.e. `tabindex` or `aria-hidden`
const TOGGLED_VALUE = 'value';
const ORIGINAL_VALUE = 'original';
const LABEL = 'test';
const cachedAttrName = getDataAttr(LABEL, ATTR_NAME);

const setup = (isToggled, value) => {
  const originalEl = document.createElement('div');

  if (value) {
    if (isToggled) {
      // if not toggled, add the original value
      originalEl.setAttribute(ATTR_NAME, value);
    } else {
      // if toggled, add the cached value
      originalEl.setAttribute(cachedAttrName, value);
    }
  }

  const { element, originalValue, cachedAttr } = toggleElementAttr(
    originalEl,
    isToggled,
    {
      NAME: ATTR_NAME,
      VALUE: TOGGLED_VALUE,
    },
    LABEL,
  );
  const toggledValue = element.getAttribute(ATTR_NAME);
  const cachedValue = element.getAttribute(cachedAttrName);

  return {
    originalValue,
    toggledValue,
    cachedAttr,
    cachedValue,
    originalEl,
    element,
  };
};

describe('Header util toggleElementAttr:', () => {
  it('Returns the same element', () => {
    const { originalEl, element } = setup(true);

    expect(element.isEqualNode(originalEl)).toBe(true);
  });

  it("Returns the cached attribute's name", () => {
    const { cachedAttr } = setup(true);

    expect(cachedAttr).toBe(cachedAttrName);
  });

  describe('When element is hidden:', () => {
    const isToggled = true;

    it('Caches the original attribute value', () => {
      const { cachedValue } = setup(isToggled, ORIGINAL_VALUE);
      expect(cachedValue).toBe(ORIGINAL_VALUE);
    });

    it('Does not cache when there was no original value', () => {
      const { cachedValue } = setup(isToggled);
      expect(cachedValue).toBeNull();
    });

    it('Does not cache when there was already a cached attr', () => {
      const testValue = 'test';
      const { cachedValue } = setup(isToggled, testValue);
      expect(cachedValue).toBe(testValue);
    });

    it('Sets to the toggled value', () => {
      const { toggledValue } = setup(isToggled);
      expect(toggledValue).toBe(TOGGLED_VALUE);
    });
  });

  describe('When element is not toggled:', () => {
    const isToggled = false;

    it('Resets to original value', () => {
      const { toggledValue } = setup(isToggled, ORIGINAL_VALUE);
      expect(toggledValue).toBe(ORIGINAL_VALUE);
    });

    it('Removes the toggled attribute when there was no original value', () => {
      const { toggledValue } = setup(isToggled);
      expect(toggledValue).toBeNull();
    });
  });
});
