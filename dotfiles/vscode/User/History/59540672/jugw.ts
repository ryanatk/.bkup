interface Script {
  async?: boolean;
  id: string;
  src: string;
  onload?: () => void;
}

// helper function to create script
const createScript = (scriptProps: Script): HTMLScriptElement => {
  const { id, src, async } = scriptProps;

  const script = document.createElement('script');

  script.async = async ?? true;
  script.id = id;
  script.src = src;

  document.head.appendChild(script);

  return script;
};

const addScript = ({ onload, ...scriptProps }: Script): (() => void) => {
  const existingScript = document.getElementById(scriptProps.id);

  if (existingScript && onload) {
    onload();
  }

  // if script is not found, create it
  const script = existingScript ?? createScript(scriptProps);

  // returns "remove" fn, for optional clean up
  return () => script.remove();
};

export default addScript;
