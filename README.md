# UU5 to Markdown
Develop branch : [![Build Status](https://travis-ci.org/jiridudekusy/uu5-to-markdown.svg?branch=develop)](https://travis-ci.org/jiridudekusy/uu5-to-markdown)

Master branch : [![Build Status](https://travis-ci.org/jiridudekusy/uu5-to-markdown.svg?branch=master)](https://travis-ci.org/jiridudekusy/uu5-to-markdown)


Converts uu5string and uuDocKit JSON into markdown.

[Changelog](doc/CHANGELOG.md)

Following UU5 components are suppported:
- Core
  - UU5.Bricks.P
  - UU5.Bricks.Strong
  - UU5.Bricks.Em
  - UU5.Bricks.Link
  - UU5.Bricks.Header
  - UU5.Bricks.Section
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

- uuBookkit Plugin 
   - UU5.Bricks.Header with level offset (during MD -> UU5 conversion level is MD level + 1)
   - UuBookKit.Bricks.GoToPageLink
   - UuDocKit.Bricks.GoToPageLink

- uuAppDesignKit Plugin
  - UuApp.DesignKit.UuSubAppDataStoreList
  - UuApp.DesignKit.UuCmdList
  - UuApp.DesignKit.UuSubAppInfo
  - UuApp.DesignKit.UuAppProfileList
  - UuApp.DesignKit.UU5UveList
  - UuApp.DesignKit.UuCmdErrorList
  - UuApp.DesignKit.UuCmdInfo
  - UuApp.DesignKit.UuCmdDefaultValueList
  - UuApp.DesignKit.DescriptionList
  - UuApp.DesignKit.BusinessRoleList
  - UuApp.DesignKit.BusinessProcessList
  - UuApp.DesignKit.BusinessUseCaseList
  - UuApp.DesignKit.UuAppObjectStoreSchemaList
  - UuApp.DesignKit.UuAppObjectStoreInfo
  - UuApp.DesignKit.UuAppBinaryStoreInfo
  - UuApp.DesignKit.UuAppObjectStoreSchemaLimitList
  - UuApp.DesignKit.UuAppObjectStoreSchemaIndexList
  - UuApp.DesignKit.UuAppObjectStoreSchemaDaoMethodList
  - UuApp.DesignKit.UuAppBinaryStoreSchemaDaoMethodList
  - UuApp.DesignKit.UU5UveInfo
  - UuApp.DesignKit.UU5RouteList
  - UuApp.DesignKit.UU5RouteInfo
  - UuApp.DesignKit.UU5ComponentInfo
  - UuApp.DesignKit.UU5ComponentMixins
  - UuApp.DesignKit.UU5ComponentList
  - UuApp.DesignKit.Table

The components that are not supported are copied to markdown as is.

## How to use it

// TODO
Include library into package.json :
```json
{
  "dependencies": {
    "uu5-to-markdown": "^0.2.0"
  }
}
```

### Convert UU5 to MD

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

### Convert MD to UU5

To convert markdown to UU5 you must use CodeKit(uu5codekitg01) with plugin from this repository to convert non-markdown extensions (like sections).

```ecmascript 6
// import core
import {UU5ToMarkdown} from "uu5-to-markdown";
import CodeKit from 'uu5codekitg01';

//import plugins
import {mdToUu5Plugin} from "uu5-to-markdown";

//create convertor
let mdr = new CodeKit.MarkdownRenderer('full', {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
//register plugin for non-markdown extendsions (like sections)
mdr.use(mdToUu5Plugin);

//convert markdown to uu5string
let markdown = "...some markdown string..."
let uu5String = mdr.render(markdown);

```

### Convert uuDocKit JSON to MD

```ecmascript 6
// import core
import {UU5ToMarkdown} from "uu5-to-markdown";
//import plugins
import {UUDockitPlugin, UU5CodeKitConverters} from "uu5-to-markdown";
//import uuDocKit convertor
import {UuDocKitToMarkdown} from "uu5-to-markdown";

//create uu5convertor
let uu5toMarkdown = new UU5ToMarkdown( new UU5CodeKitConverters(), new UUDockitPlugin());

//create uuDocKit convertor
let uuDocKitToMarkdown = new UuDocKitToMarkdown(uu5toMarkdown);

//convert uuDocKit JSON to markdown
let uuDocKitJson = "...some uuDocKit JSON string..."
let markdown = uuDocKitToMarkdown.toMarkdown(uuDocKitJson);
```
### Convert MD to uuDocKit JSON

To convert markdown to uuDocKit JSON you must use CodeKit(uu5codekitg01) with plugin and helper from this repository.

```ecmascript 6
// import core
import {UU5ToMarkdown} from "uu5-to-markdown";
import CodeKit from 'uu5codekitg01';
//import plugins
import {mdToUu5Plugin} from "uu5-to-markdown";
import {MarkdownToUuDocKit} from "uu5-to-markdown";

//create convertor
let mdr = new CodeKit.MarkdownRenderer('full', {
  html: true,
  xhtmlOut: true,
  typographer: true,
  highlight: true,
  headerLevel: 2
});
//register plugin for non-markdown extendsions (like sections)
mdr.use(mdToUu5Plugin);

//create uuDocKit convertor
let markdownToUuDocKit = new MarkdownToUuDocKit(mdr)

//convert markdown to uuDocKit JSON
let markdown = "...some markdown string..."
let uuDocKitJSON = markdownToUuDocKit.toUuDocKit(markdown);

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
  * Run `yarn test` or `npm run test` for unit tests, integration tests and test with UU5(CodeKit.MarkdownRenderer) in NodeJS (debug in IntelliJ is supported)
  * Run `yarn browserTest` or `npm run browserTest` for unit tests in browser 

### Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
* `yarn start` or `npm start` - run webserver on <http://localhost:8080/> for access demo pages 
* `yarn test` or `npm run test` - unit tests, integration tests and test with UU5(CodeKit.MarkdownRenderer) in NodeJS (debug in IntelliJ is supported)
* `yarn browserTest` or `npm run browserTest` -  unit tests in browser 

