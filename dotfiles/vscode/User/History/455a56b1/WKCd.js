import { useRef } from 'react';
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

  // console.log(Object.entries(KEY).find);
  const [key] = Object.entries(KEY).find(([, value]) => value === action);
  const menuRef = React.createRef(null);
  const menuTriggerRef = React.createRef(null);

  const event = new KeyboardEvent('keyup', { key });
  event.preventDefault = preventDefault;

  const { container } = render(
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

      <a href="/outside">outside element</a>
    </div>,
  );

  // move focus to currentIndex
  if (currentIndex === MENU_TRIGGER_INDEX) {
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

  describe.skip('always', () => {
    test('ESCAPE action fires onEscape callback', () => {
      setup(ACTION.ESCAPE);
      expect(onEscape).toBeCalled();
    });

    test('ESCAPE action traverses to trigger', () => {
      setup(ACTION.ESCAPE);
      expect(onTraverse).toBeCalledWith(MENU_TRIGGER_INDEX);
    });

    // TODO: if we don't need this, we can drop the whole "return" bizness
    // test('ESCAPE action updates focus to trigger', () => {
    //   setup(ACTION.ESCAPE);
    // });

    test('TAB fires onTraverse callback', () => {
      setup(ACTION.TAB);
      expect(onTraverse).toBeCalled();
    });

    test('tabbing out of menu fires onEscape callback', () => {
      setup(ACTION.TAB, { currentIndex: NUMBER_OF_LINKS - 1 });
      expect(onEscape).toBeCalled();
    });
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

  describe.skip('when on the trigger', () => {
    const options = { currentIndex: MENU_TRIGGER_INDEX };

    test('', () => {
      setup();
    });
  });

  describe('when on the first link', () => {
    const currentIndex = 0;

    test('NEXT fires onTraverse, increasing the index by 1', () => {
      setup(ACTION.NEXT, { currentIndex });
      expect(onTraverse).toBeCalledWith(currentIndex + 1);
    });

    test.only('PREVIOUS does not fire onTraverse', () => {
      setup(ACTION.NEXT, { currentIndex });
      expect(onTraverse).not.toBeCalled();
    });
  });

  describe('when on the last link', () => {
    test('NEXT does not fire onTraverse', () => {
      setup(ACTION.NEXT);
    });

    test('PREVIOUS fires onTraverse, decreasing the index by 1', () => {
      setup(ACTION.PREVIOUS);
    });
  });
});
