interface Script {
  async?: boolean;
  id: string;
  src: string;
  onload?: () => void;
}

// helper function to create script
const createScript = (scriptProps: Script): HTMLScriptElement => {
  const { id, src, async, onload = () => null } = scriptProps;

  const script = document.createElement('script');

  script.async = async ?? true;
  script.id = id;
  script.src = src;
  script.onload = () => {
    onload();
  };

  document.head.appendChild(script);

  return script;
};

const addScript = (scriptProps: Script): (() => void) => {
  const existingScript = document.getElementById(scriptProps.id);

  if (existingScript && scriptProps.onload) {
    existingScript.addEventListener('load', scriptProps.onload);
  }

  // if script is not found, create it
  const script = existingScript ?? createScript(scriptProps);

  // returns "remove" fn, for optional clean up
  return () => script.remove();
};

export default addScript;