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
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // ignore write errors
    console.error(err);
  }
};

export const clearState = (key: string = STATE_KEY): void => {
  localStorage.removeItem(key);
};

export default {
  loadState,
  saveState,
};
