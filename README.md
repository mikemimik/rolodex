# Project Branch

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

## Prerequisites
You _should_ have a GitHub repository already created, in which your project will live after you're finished cloning and initilizing the project.

> Visit this page to create a new repository in your account: <br />
> `https://github.com/new`

## Install Dependencies
To begin using this repository please run the following command.
> `npm install`

## Getting Started
Running the following command will prompt you to enter some information. This well setup this folder to now point at the repository that you enter while filling in the prompt.
```
$ npm run init
```

You will be prompted for the following things:
1. **Project Name**: The name you want to call the project
2. **GitHub username**, and **GitHub repository**: Your GitHub username and and the name of the repository you created to hold this project.
> Ex. https://github.com/{your-username}/{your-new-repository}
3. **Author**: You're name.

Once complete, you'll be shown what the project package file will looking. An example is listed below. Simply type `y` or `yes` to complete the process.
```
{
  "name": "something-awesome",
  "version": "1.0.0",
  "description": "HackerYou Fullstack Masterclass Project",
  "main": "index.js",
  "scripts": {
    "lint": "semistandard",
    "test": "react-scripts test",
    "start:server": "pm2 start process.config.js",
    "stop:server": "pm2 delete process.config.js",
    "logs:server": "pm2 logs /api/ --lines 10",
    "start:client": "react-scripts start",
    "build:client": "react-scripts build",
    "git:remote:set": "git remote set-url https://github.com/mikemimik/something-awesome.git"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mikemimik/something-awesome.git"
  },
  "keywords": [],
  "author": "Michael Perrotte",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/HackerYou/con-ed-full-stack-student-notes/issues"
  },
  "homepage": "https://github.com/HackerYou/con-ed-full-stack-student-notes#readme",
  "dependencies": {
    "body-parser": "^1.18.3",
    "eslint": "^5.12.0",
    "express": "^4.16.4",
    "init-package-json": "^1.10.3",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "devDependencies": {
    "hackeryou-fullstack-react-scripts": "2.3.0",
    "pm2": "^3.3.1",
    "semistandard": "github:mikemimik/semistandard"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
  "semistandard": {
    "ignore": [
      "build/**"
    ]
  }
}


Is this OK? (yes)
```

After this process has been completed, you'll notice that your project folder has had it's git configuration set to your GitHub repository. You can start committing and pushing right away!

## Usage

> Start API server

```
$ npm run start:server
```

> Start Webpack Server

```
$ npm run start:client
```
