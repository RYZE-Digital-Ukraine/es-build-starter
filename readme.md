# ⚡ ESBuild starter ⚡

## Requirements 📛
* Installed [NodeJS](https://nodejs.org/en/) (`>=16.7.0`)

## Installation ✅
* go to downloaded directory: `cd *foldername*`
* download all dependencies: `npm i`
* setup env variables, you need:
  * setup `esbuild.options.js` (vars, urls, paths)
  * setup `esbuild.config.js` (turn on/off plugins)
  * change dir to `/build/src/views/`
  * customize file `twig-vars.json`
* for project developing, enter the command: `npm run dev` (dev mode)
* for project build, enter the command `npm run build` (build mode)

## Features 🎉
* Based on [ESBuild](https://esbuild.github.io/)
* Unified editor code format provided by [EditorConfig](https://editorconfig.org/)
* Used preprocessor [SCSS](https://sass-lang.com/)
* Used transpiler [Babel](https://babeljs.io/) for supporting JavaScript (ES6+)
* Used Template Engine [TWIG](https://github.com/twigjs/twig.js/wiki)
* Strict code guide for JS based on [ESLint](https://eslint.org/)
* Strict code guide for CSS based on [Stylelint](https://stylelint.io/)
* For CSS by default [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
* ...optional [SmartGrid](https://github.com/dmitry-lavrik/smart-grid)

## File structure 📁

```
esbuild-starter/
├── plugins/
├── build/
│   ├── dist/
│   └── src/
│       ├── fonts/
│       ├── imgs/
│       ├── js/
│       ├── css/
│       └── views/
│           ├── parts/
│           ├── twig-vars.json    
│           └── index.twig    
│     
├── package.json
├── esbuild.config.js
├── esbuild.options.js
├── .editorconfig
├── .babelrc
├── .eslintrc
├── .eslintignore
├── .stylelintrc
└── .gitignore
```

## Contributing 🤙
* Contact: [savvoff](https://t.me/savvoff)
