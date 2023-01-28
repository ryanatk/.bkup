const STATE_KEY = 'root';

export const loadState = (key = STATE_KEY) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any, key: string = STATE_KEY) => {
  console.log({ state, key });
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // ignore write errors
    console.error(err);
  }
};

export default {
  loadState,
  saveState,
};
