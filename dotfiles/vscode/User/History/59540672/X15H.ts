interface Script {
  async?: boolean;
  id: string;
  src: string;
}

const READY = 'ready';

// helper function to create script
const createScript = (
  scriptProps: Script,
  onload: () => void = () => null,
): HTMLScriptElement => {
  const { id, src, async } = scriptProps;

  const script = document.createElement('script');

  script.async = async ?? true;
  script.id = id;
  script.src = src;
  script.onload = () => {
    script.dataset.ready = READY; // set flag, for future dependents
    onload();
  };

  document.head.appendChild(script);

  return script;
};

const addScript = (scriptProps: Script, onload?: () => void): (() => void) => {
  const existingScript = document.getElementById(scriptProps.id);

  if (existingScript && onload) {
    // if script is already loaded, fire onload now
    if (existingScript.dataset.ready === READY) {
      onload();
    } else {
      // else setup onload to wait
      existingScript.addEventListener('load', onload);
    }
  }

  // if script is not found, create it
  const script = existingScript ?? createScript(scriptProps, onload);

  // returns "remove" fn, for optional clean up
  return () => script.remove();
};

export default addScript;
