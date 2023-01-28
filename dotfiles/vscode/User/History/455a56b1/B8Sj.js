import { render } from '@testing-library/react';
import traverseMenu, {
  ACTION,
  KEY,
  MENU_TRIGGER_INDEX,
  getMenuLinks,
} from './traverseMenu';
import { range } from 'lodash';

const NUMBER_OF_LINKS = 6;

const onTraverse = jest.fn();
const onEscape = jest.fn();
const onClickTrigger = jest.fn();
const preventDefault = jest.fn();

const setup = (action, options = {}) => {
  const { currentIndex = 0 } = options;

  const [key] = Object.entries(KEY).find(([, value]) => value === action);
  const menuRef = React.createRef(null);
  const menuTriggerRef = React.createRef(null);
  const outsideRef = React.createRef(null);

  const event = new KeyboardEvent('keyup', { key });
  event.preventDefault = preventDefault;

  render(
    <div>
      <button ref={menuTriggerRef} onClick={onClickTrigger}>
        trigger
      </button>

      <ul ref={menuRef}>
        {range(NUMBER_OF_LINKS).map((num) => (
          <li key={num}>
            <a href={`/${num}`}>link {num}</a>
          </li>
        ))}
      </ul>

      <button ref={outsideRef}>outside element</button>
    </div>,
  );

  // move focus to currentIndex
  if (currentIndex === null) {
    outsideRef.current.focus();
  } else if (currentIndex === MENU_TRIGGER_INDEX) {
    menuTriggerRef.current.focus();
  } else {
    getMenuLinks(menuRef.current)[currentIndex].focus();
  }

  const el = traverseMenu(event, {
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,
    currentIndex,
    onTraverse,
    onEscape,
  });

  return { el };
};

describe('traverseMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ESCAPE action fires onEscape callback', () => {
    setup(ACTION.ESCAPE);
    expect(onEscape).toBeCalled();
  });

  test('ESCAPE action traverses to trigger', () => {
    setup(ACTION.ESCAPE);
    expect(onTraverse).toBeCalledWith(MENU_TRIGGER_INDEX);
  });

  test('TAB fires onTraverse callback', () => {
    setup(ACTION.TAB);
    expect(onTraverse).toBeCalled();
  });

  test.only('tabbing out of menu fires onEscape callback', () => {
    setup(ACTION.TAB, { currentIndex: null });
    expect(onEscape).toBeCalled();
  });

  describe('when on a button', () => {
    const options = { currentIndex: MENU_TRIGGER_INDEX };

    test('CLICK prevents default', () => {
      setup(ACTION.CLICK, options);
      expect(preventDefault).toBeCalled();
    });

    test("CLICK fires the button's onClick", () => {
      setup(ACTION.CLICK, options);
      expect(onClickTrigger).toBeCalled();
    });
  });

  describe('when on the first link', () => {
    const currentIndex = 0;

    test('NEXT fires onTraverse, increasing the index by 1', () => {
      setup(ACTION.NEXT, { currentIndex });
      expect(onTraverse).toBeCalledWith(currentIndex + 1);
    });

    test('PREVIOUS does not fire onTraverse', () => {
      setup(ACTION.PREVIOUS, { currentIndex });
      expect(onTraverse).not.toBeCalled();
    });
  });

  describe('when on the last link', () => {
    const currentIndex = NUMBER_OF_LINKS - 1;

    test('NEXT does not fire onTraverse', () => {
      setup(ACTION.NEXT, { currentIndex });
      expect(onTraverse).not.toBeCalled();
    });

    test('PREVIOUS fires onTraverse, decreasing the index by 1', () => {
      setup(ACTION.PREVIOUS, { currentIndex });
      expect(onTraverse).toBeCalledWith(currentIndex - 1);
    });
  });
});
