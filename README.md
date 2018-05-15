<p class="center">
  <img src="https://i.imgur.com/73gFLON.png" alt="nucleus logo" />
</p>

# Nucleus

Nucleus is a small tool to help you quickly create React Components without all the boilerplate and hassle! It is designed for Mac's and works
even with machines which don't have Node JS installed!

## Getting Started

To get started with this project simply run:

`npm i -g nucleus`

## Usage

Nucleus is easy to use and only requires one command line argument!

`nucleus Auth`

will create a new `Auth` directory and React component which will end up looking like this!
```
└ src
  ├── components
  │   └── Auth
  │       └── Auth.js
```

**Nucleus expects your React App to have a /src/components directory where your components are stored**

If your app does not have this directory ensure you specify the `--out=/your/custom/path` flag to determine where your component will be written.

You can also use different flags like `--style` and  `--dev` to automatically create and link a css file to the created component and run dev mode respectively.

## Program Arguments

The table below helps to show the different program arguments and how to use them! **Note: you cannot use --style and --template** in the same command.

| **Argument**   | **Example**                                       | **Shortcut** | **Description**                                                                                                                                      | **Required** |
| -------------- | ------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Component name | `nucleus Auth`                                    | None         | In the example `Auth` is the component name!                                                                                                         | true         |
| --out          | `nucleus Auth --out=/src/pages/`                  | None         | The `--out` argument defines the output where the component will be written. By default this is `./src/components`                                   | false        |
| --style        | `nucleus Auth --style`                            | -s           | This will scaffold a stylesheet along with the react component and import the stylesheet automatically into the component                            | false        |
| --template     | `nucleus Auth --template=/src/components/List.js` | None         | This flag will allow you to use a custom React JS file as a template to create your new component. Ensure the path leads to a valid javascript file! | false        |
| --dev          | `nucleus Auth --dev`                              | -d           | Runs the application in developer mode and shows additional error logging to the console.                                                            | false        |

## Built With

* [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - Javascript event driven non blocking server side framework
* [PKG](https://github.com/zeit/pkg) - Executable packager
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Git](https://git-scm.com/) - Version Control System
* [Chalk](https://www.npmjs.com/package/chalk) - Colored Console Output

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Christian Bartram** - *Initial work* - [Cbartram](https://github.com/cbartram)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* React for making a great framework!
* Jake/Adam for inspiring this cool little tool!
