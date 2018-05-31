/**
 * Handles Generating templates and returning an object containing them
 * @param name String the name of the component
 * @return object object containing the three templates filled with the component Name
 */
module.exports = (name) => {
  // The react template which uses custom styles
  const templateStyle = `import React, { Component } from 'react';
  import './${name}.css';

  export default class ${name} extends Component {
    render() {
        return <h1>${name}</h1>
    }
  }`;
  // React template that does NOT include styles
  const templateOriginal = `import React, { Component } from 'react';

  export default class ${name} extends Component {
    render() {
        return <h1>${name}</h1>
    }
  }`;

  const templateFunctional = `import React from ‘react’;

  const ${name} = () => (
   <div>${name}</div>
  );

  export default ${name};`;

  return {
    style: templateStyle,
    default: templateOriginal,
    functional: templateFunctional,
  };
};
