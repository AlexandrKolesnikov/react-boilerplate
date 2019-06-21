# React PWA Boilerplate
Admin part of the Double Map tickets system Mobile Application

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

## Git Flow

#### Git Hooks

You cannot commit and push changes before the ESLint is passed and the errors are corrected.
![Git Hooks Error](src/assets/images/readmemd/git-hooks.gif)

## Environment Settings

In the project we use environment variables.

Environment variables are useful when:

* Values are different across developer machines.
* Values are different across multiple environments: (dev, staging, qa, prod).
* Values change frequently and are highly dynamic.
* Environment variables can be changed easily - especially when running in CI.

In the package.json file, you can customize the commands that will run files of different environments depending on your needs.
![Git Hooks Error](src/assets/images/readmemd/env-settings.png)

## License
React PWA Boilerplate is [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).
