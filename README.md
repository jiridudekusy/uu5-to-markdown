# UU5 to Markdown
Develop branch : [![Build Status](https://travis-ci.org/jiridudekusy/uu5-to-markdown.svg?branch=develop)](https://travis-ci.org/jiridudekusy/uu5-to-markdown)

Master branch : [![Build Status](https://travis-ci.org/jiridudekusy/uu5-to-markdown.svg?branch=master)](https://travis-ci.org/jiridudekusy/uu5-to-markdown)


Converts uu5string into markdown.

Following UU5 components are suppported:
- Core
  - UU5.Bricks.P
  - UU5.Bricks.Strong
  - UU5.Bricks.Em
  - UU5.Bricks.Link
  - UU5.Bricks.Header
  - UU5.Bricks.Code (inline and block)
  - UU5.Bricks.Blockquote
  - Lists
    - UU5.Bricks.Ol
    - UU5.Bricks.Ul
    - UU5.Bricks.Li
  - Tables
    - UU5.Bricks.Table
    - UU5.Bricks.Table.THead
    - UU5.Bricks.Table.TBody
    - UU5.Bricks.Table.TFoot
    - UU5.Bricks.Table.Tr
    - UU5.Bricks.Table.Th
    - UU5.Bricks.Table.Td


- uu5CodeKit Plugin
  - UU5.CodeKit.CodeViewer

- uuDockit Plugin 
   - UU5.Bricks.Header with level offset (during MD -> UU5 conversion level is MD level + 1)

The components that are not supported are copied to markdown as is.

## How to use it

// TODO
Include library into package.json :
```json
{
  "dependencies": {
    "uu5-to-markdown": "^0.1.3"
  }
}
```

You can then use in your ES6 code :
```ecmascript 6
// import core
import {UU5ToMarkdown} from "uu5-to-markdown";
//import plugins
import {UUDockitPlugin, UU5CodeKitConverters} from "uu5-to-markdown";

//create convertor
let uu5toMarkdown = new UU5ToMarkdown( new UU5CodeKitConverters(), new UUDockitPlugin());

//convert uu5string to markdown
let uu5string = "...some uu5 string..."
let markdown = uu5toMarkdown.toMarkdown(uu5string);

```

## Development environment description

* Webpack 3 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/) and [Mochify](https://www.npmjs.com/package/mochify).
* Linting with [ESLint](http://eslint.org/).

### Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

### Getting started

1. Build your library
  * Run `yarn install` (recommended) or `npm install` to get the project's dependencies
  * Run `yarn build` or `npm run build` to produce minified version of your library.
2. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
3. Running the tests
  * Run `yarn test` or `npm run test` for unit tests in NodeJS (debug in IntelliJ is supported)
  * Run `yarn browserTest` or `npm run browserTest` for unit tests in browser 
  * Run `yarn integrationTest` or `npm run integrationTest` for integration tests in NodeJS (debug in IntelliJ is supported)

### Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
* `yarn start` or `npm start` - run webserver on <http://localhost:8080/> for access demo pages 
* `yarn test` or `npm run test` - unit tests in NodeJS (debug in IntelliJ is supported)
* `yarn browserTest` or `npm run browserTest` -  unit tests in browser 
* `yarn integrationTest` or `npm run integrationTest` - integration tests in NodeJS (debug in IntelliJ is supported)
