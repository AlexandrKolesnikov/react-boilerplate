# React PWA Boilerplate
Simple boilerplate built to

## Basic Setup
These steps are required before further steps.

### Machine Requirements
You need to have installed:  
- [Node.js](https://nodejs.org/en/)  
- [NPM Package manager](https://www.npmjs.com/)  
- Cloned or downloaded version of this project

To prepare Application for further steps after repository clone you need run next commands:
```sh
cd <PROJECT_DIR>
npm install
```

## Development Start
To run Application in development mode you need to run `npm run dev`. As result, you will get fully completed local development environment.
```sh
npm run dev
```

## Build Production
To build optimized production version you need to run `npm run build`, after completion, you will have bundled production code that you can use to deploy it to your hosting. You can take the result at the `~/dist` folder
```sh
npm run build
```

## Useful Commands
`npm run lint` -
Check Project for ESLint errors and warnings. Very useful in pair with some CI/CD or Git Hooks.

`npm run lint-fix` -
Automatically resolve as much as possible ESLint errors with

`npm run clean` -
Removes Production Build folder

`npm run serve` -
Starts local HTTP server to serve Production Build code at the localhost

`npm run deploy-dev` -
You can use here any command or commands sequence to deploy project to the VPS or hosting.

## License
React PWA Boilerplate is [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).