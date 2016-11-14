# react-redux-md-starter
React 15.2.1, Redux, Babel, ES6 and Material UI 0.15.2 starter kit

## Getting started

Once the repository has been cloned, run `npm install` to install all the dependencies. This project uses express for the server side code and React, Material UI and ES2015 (through Babel) for the front end. This project also uses gulp to automate tasks.

Running `gulp` will print out the common tasks for the project. To get started, `gulp build` will build `*.jsx` files in `src/` and dependencies into `dist/bundle.js`. Additionally, `gulp watch` will rebuild the `.jsx` files when there are changes.

`gulp serve` will start the node express server which is listening on port 8080.

If not in active development, `gulp start` (or `npm start`) will build the project and start the node server. For active development, `gulp watch` and `gulp serve` are suggested as they rebuild the client code on changes to the `*.jsx` and the server code on changes to `server/server.js`.

## Linting

You can lint all the project files using either `npm run lint` or `gulp lint`. This project uses `eslint` and the rules are located in `.eslintrc.js`.

## Cleaning

Running a `gulp clean:dist` will remove the `dist/` folder. `gulp clean` is an alias for `gulp clean:dist`. The `node_modules` folder can be cleaned up using `gulp clean:modules` and both the build folder and the node modules folder can be cleaned up using `gulp clean:all`.

## `npm` aliases

There are `npm` aliases for common `gulp` tasks as well. They are listed in the following table

| `gulp` command | `npm` command     |
|----------------|-------------------|
| `gulp start`   | `npm start`       |
| `gulp test`    | `npm test`        |
| `gulp serve`   | `npm run server`  |
| `gulp watch`   | `npm run watcher` |
| `gulp lint`    | `npm run linter`  |

## Useful links
* [React Docs](https://facebook.github.io/react/docs/getting-started.html)
* [Redux Homepage](http://redux.js.org/)
* [Material UI Docs](http://www.material-ui.com/#/)
* [ES2015 syntax](https://babeljs.io/docs/learn-es2015/)
* [browserify Docs](https://github.com/substack/node-browserify#usage)
* [Babel Options](https://babeljs.io/docs/usage/options/)
