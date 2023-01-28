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
  console.log('!createScript');
  const { id, src, async } = scriptProps;

  const script = document.createElement('script');

  script.async = async ?? true;
  script.id = id;
  script.src = src;
  script.onload = () => {
    script.dataset.ready = READY;
    onload();
  };

  document.head.appendChild(script);

  return script;
};

const addScript = (scriptProps: Script, onload?: () => void): (() => void) => {
  const existingScript = document.getElementById(scriptProps.id);

  if (existingScript && onload) {
    if (existingScript.dataset.ready === READY) {
      onload();
    } else {
      existingScript.addEventListener('load', onload);
    }
  }

  console.log({ existingScript });

  // if script is not found, create it
  const script = existingScript ?? createScript(scriptProps, onload);

  // returns "remove" fn, for optional clean up
  return () => script.remove();
};

export default addScript;
