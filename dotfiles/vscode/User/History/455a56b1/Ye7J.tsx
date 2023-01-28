import { useRef } from 'react';
import traverseMenu from './traverseMenu';

const preventDefault = jest.fn();
const onTraverse = jest.fn();
const onEscape = jest.fn();

interface SetupOptions {
  key: string;
}

const setup = ({ key }: SetupOptions) => {
  const menuRef = useRef < HTMLDivElement > null;
  const menuTriggerRef = useRef < HTMLButtonElement > null;

  const { container } = render(
    <div ref={menuRef}>
      <span>stuff</span>
    </div>,
  );

  traverseMenu(key, preventDefault, {
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,
    currentIndex,
    onTraverse,
    onEscape,
  });
};

describe('traverseMenu', () => {});
