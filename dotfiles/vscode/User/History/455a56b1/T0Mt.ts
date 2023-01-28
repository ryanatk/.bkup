import traverseMenu from './traverseMenu';

const preventDefault = jest.fn();
const onTraverse = jest.fn();
const onEscape = jest.fn();

interface setupOptions {
  key: string;
}
const setup = ({ key }: setupOptions) => {
  traverseMenu(key, preventDefault, {
    menu,
    menuTrigger,
    menuLinks,
    currentIndex,
    onTraverse,
    onEscape,
  });
};

describe('traverseMenu', () => {});
