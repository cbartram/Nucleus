/**
 *  Handles Generating templates and returning an object containing them
 */
module.exports = (config) => {
  // The react template which uses custom styles
  const templateStyle = `import React, { Component } from 'react';
  import './${config.name}.css';

  export default class ${config.name} extends Component {
    render() {
        return <h1>${config.name}</h1>
    }
  }`;
  // React template that does NOT include styles
  const templateOriginal = `import React, { Component } from 'react';

  export default class ${config.name} extends Component {
    render() {
        return <h1>${config.name}</h1>
    }
  }`;

  const templateFunctional = `import React from ‘react’;

  const ${config.name} = () => (
   <div>${config.name}</div>
  );

  export default ${config.name};`;

  return {
    style: templateStyle,
    default: templateOriginal,
    functional: templateFunctional,
  };
};
