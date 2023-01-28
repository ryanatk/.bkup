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

const setup = (options = {}) => {
  const { action, currentIndex = 0 } = options;

  // console.log(Object.entries(KEY).find);
  const [key] = Object.entries(KEY).find(([, value]) => value === action);
  const menuRef = React.createRef(null);
  const menuTriggerRef = React.createRef(null);

  const event = new KeyboardEvent('keyup', { key });

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
  describe.only('always', () => {
    test('ESCAPE action fires onEscape callback', () => {
      const options = { action: ACTION.ESCAPE };
      setup(options);
      expect(onEscape).toBeCalled();
    });

    test('ESCAPE action traverses to trigger', () => {
      const options = { action: ACTION.ESCAPE };
      setup(options);
      expect(onTraverse).toBeCalledWith(MENU_TRIGGER_INDEX);
    });

    // test('ESCAPE action updates focus to trigger', () => {
    //   setup(ACTION.ESCAPE);
    // });

    test('TAB fires onTraverse callback', () => {
      const options = { action: ACTION.TAB };
      setup(options);
      expect(onTraverse).toBeCalled();
    });

    test('tabbing out of menu fires onEscape callback', () => {
      const options = {
        action: ACTION.TAB,
        currentIndex: NUMBER_OF_LINKS - 1,
      };
      setup(options);
    });
  });

  describe('when on a button', () => {
    test('CLICK prevents default', () => {
      setup();
    });

    test("CLICK fires the button's onClick", () => {
      setup();
    });
  });

  describe('when on the trigger', () => {
    test('', () => {
      setup();
    });
  });

  describe('when on the first link', () => {
    test('NEXT fires onTraverse, increasing the index by 1', () => {
      setup();
    });

    test('PREVIOUS does not fire onTraverse', () => {
      setup();
    });
  });

  describe('when on the last link', () => {
    test('NEXT does not fire onTraverse', () => {
      setup();
    });

    test('PREVIOUS fires onTraverse, decreasing the index by 1', () => {
      setup();
    });
  });
});
