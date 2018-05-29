<p align="center">
  <img src="https://i.imgur.com/73gFLON.png" alt="nucleus logo" />
</p>

[![Build Status](https://travis-ci.org/cbartram/Nucleus.svg?branch=master)](https://travis-ci.org/cbartram/Nucleus)
[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/react-nucleus)
![npm](https://img.shields.io/npm/v/npm.svg)
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/cbartram2)

# Nucleus

Nucleus is a lightweight tool to help you quickly create React Components without all the boilerplate and hassle! It is designed for Mac's specifically and can be run from a simple global command `nucleus`!


## Getting Started

To get started with this project simply run:

`npm i -g react-nucleus`

Note: Since this is a global npm package you may need use `sudo` to install it correctly.

## Usage

Nucleus is easy to use and only requires one command line argument!

`nucleus List`

By default nucleus will create the component in the root directory where it is run (e.g. `./`) however this can be changed with the `--out` flag

Nucleus will create a new `List` directory and React component which will end up looking like this!
```
└── List
     └── List.js
```

List.js will contain this:

```jsx
import React, { Component } from 'react';

export default class List extends Component {
    render() {
        return <h1>List</h1>
    }
}
```

Check out some more program arguments below!

## Program Arguments

The table below helps to show the different program arguments and how to use them! **Note: you cannot use --style and --template** in the same command.

| **Argument**   | **Example**                                       | **Shortcut** | **Description**                                                                                                                                      | **Required** |
| -------------- | ------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Component name | `nucleus Auth`                                    | None         | In the example `Auth` is the component name!                                                                                                         | true         |
| --out          | `nucleus Auth --out=/src/pages/`                  | None         | The `--out` argument defines the output where the component will be written. By default this is `./`                                                 | false        |
| --style        | `nucleus Auth --style`                            | -s           | This will scaffold a stylesheet along with the react component and import the stylesheet automatically into the component                            | false        |
| --template     | `nucleus Auth --template=/src/components/List.js` | None         | This flag will allow you to use a custom React JS file as a template to create your new component. Ensure the path leads to a valid javascript file! | false        |
| --dev          | `nucleus Auth --dev`                              | -d           | Runs the application in developer mode and shows additional error logging to the console.                                                            | false        |
| --functional   | `nucleus Auth --functional`                       | -f           | Creates a functional react component instead of a traditional component                                                                              | false        |
| --plain        | `nucleus Auth --plain`                            | -p           | Creates **just** the javascript file and no enclosing directory                                                                                      | false        |
| --quiet       | `nucleus Auth --quiet`                            | -q           | Hides most of the console output when executing the command                                                                                      | false        |


## Examples

Here are some basic nucleus examples to help get you up and running! The following examples will assume this basic directory structure
and new additions will be denoted with the `+` character.
```
├── src
│   ├── components
│   │   ├── App.js
│   │   └── index.js
├── test
│   └── index.test.js
└── package.json
```

### Create A Basic Component called Auth

`nucleus Auth`

produces the following directory structure:

```
├── src
│   ├── components
│   │   ├── App.js
│   │   └── index.js
├── test
│   └── index.test.js
├── Auth +
│   └── Auth.js +
└── package.json
```

### Create a Basic Component with associated stylesheet

`nucleus Auth --style`

produces the following directory structure:

```
├── src
│   ├── components
│   │   ├── App.js
│   │   └── index.js
├── test
│   └── index.test.js
├── Auth +
│   └── Auth.js +
│   └── Auth.css +
└── package.json
```

### Create a new component in a specific location with styles

`nucleus Auth --style --out=./src/components/`

produces the following directory structure:

```
├── src
│   ├── components
│   │   ├── App.js
│   │   └── index.js
│   │   └──── Auth +
│   │        └── Auth.js +
│   │        └── Auth.css +
├── test
│   └── index.test.js
└── package.json
```

### Create a component in a specific location using a template

`nucleus Auth --out=./src/components/ --template=./src/components/App.js`

```
├── src
│   ├── components
│   │   ├── App.js
│   │   └── index.js
│   │   └──── Auth +
│   │        └── Auth.js +
├── test
│   └── index.test.js
└── package.json
```

### Create a basic functional component (instead of ES6 Class based)

`nucleus Auth --functional`

would produce the following directory structure:

 ```
 ├── src
 │   ├── components
 │   │   ├── App.js
 │   │   └── index.js
 ├── test
 │   └── index.test.js
 ├── Auth +
 │   └── Auth.js + (is a functional component)
 └── package.json
 ```

 ### Creating a plain component

 A plain component does not have any associated directory with it and just includes the normal JS File.

 `nucleus Auth --plain --style`

 would produce the following directory structure

  ```
  ├── src
  │   ├── components
  │   │   ├── App.js
  │   │   └── index.js
  ├── test
  │   └── index.test.js
  ├── Auth.js +
  ├── style.css + (we include the styles just not the directory)
  └── package.json
  ```

## Nucleus Templates

The `--template=./path/to/your/component.js` is a powerful way to create new components based on previous components.

Say for instance you have tons of components you need to make which all need to be wrapped in a `<Container />` component in the render method.

You can use a template of a previously created (Container wrapped) component to quickly create all your new components!

For example `nucleus Auth --template=./component/templates/YourTemplate.js` will use the `YourTemplate.js` file as a copy for Auth.

## Handling Nucleus Errors

Often times nucleus will give you errors saying that it cannot find the right path or location to create your component in.

If you do not want to use the predefined location of your root directory (`./`) you **must** specify the option `--out=./path/to/your/components`

Its **very** important that you include the `.` before the path this way Nucleus knows to create the component in your current directory since it does not use absolute paths.

For Example:

`nucleus List --out=/src/components/pages`

would tell nucleus to search from your computers root `/` for a directory called `src` compared to

`nucleus List --out=./src/components/pages`

which would command nucleus to create your component in `/Users/abc123/MyProject/src/components/pages` which is the correct location.

## Built With

* [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - Javascript event driven non blocking server side framework
* [PKG](https://github.com/zeit/pkg) - Executable packager
* [Babel](https://babeljs.io/) - Javascript next gen compiler
* [Webpack](https://webpack.js.org/) - Module Bundler
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Git](https://git-scm.com/) - Version Control System
* [Chalk](https://www.npmjs.com/package/chalk) - Colored Console Output

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

If you are interested in creating a new feature just add an issue on the repository with a description of the feature!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).


## FAQ

- **How do I download Nucleus?** Nucleus can be downloaded via [NPM](https://www.npmjs.com/packages/react-nucleus) using the command `npm install -g react-nucleus`
- **How do I run Nucleus once its installed** Nucleus can be run in any terminal using the `nucleus` keyword. Try `nucleus -v` to make sure you have it installed correctly.
- **Can I specify an output directory for Nucleus** Sure just use the `--out=./YOUR/RELATIVE/OUTPUT/DIR` command line flag.

## Authors

* **Christian Bartram** - *Lead Developer* - [Cbartram](https://github.com/cbartram)

## Why "Nucleus"

Since React is all about atoms and components are the "heart" of a React App I thought "Nucleus" would be a fitting name for
the tool!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* React for making a great framework!
* A **huge** thank you to Erika for supporting me and letting me do my codes.
* Big thanks to Jake, Taimore, and Adam for inspiring this cool little tool!
