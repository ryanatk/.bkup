interface Script {
  async?: boolean;
  id: string;
  src: string;
}

// helper function to create script
const createScript = (scriptProps: Script): HTMLScriptElement => {
  const { id, src, async } = scriptProps;

  const script = document.createElement('script');

  script.async = async ?? true;
  script.id = id;
  script.src = src;

  document.body.appendChild(script);

  return script;
};

const addScript = (scriptProps: Script): (() => void) => {
  const script =
    // if script is not found, create it
    document.getElementById(scriptProps.id) ?? createScript(scriptProps);

  // returns "remove" fn, for optional clean up
  return () => script.remove();
};

export default addScript;
