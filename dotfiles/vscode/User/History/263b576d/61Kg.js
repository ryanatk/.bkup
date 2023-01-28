import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// we've had issues with the browser caching aggressively
// so i think it's safe to say we don't want a PWA
// registerServiceWorker();

// AXE accessibility helpers
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
