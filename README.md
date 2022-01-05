# TutorialsNodeJs 
## _An app to manage Tutorials

## Features
APIs:
- Create a Tutorial
- Update a Tutorial by ID
- Delete a Tutorial by ID
- Get all Tutorials
- Able to search by Title
- Able to sort by crated/updated date (Default updated DESC

## Installation
TutorialsNodeJs requires [Node.js](https://nodejs.org/) v16+ to run.

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
$ nvm install 16.13.1
$ nvm use 8.3.0
```
## Clone this repo (and cd to it)

```sh
$ git clone https://github.com/jaimin45/demo-nodejs-tutorials.git
$ cd demo-nodejs-tutorials
```
## Install the dependencies and devDependencies and start the server.

```sh
npm install
```
## Load env vars

```sh
MONGO_URL="mongodb://localhost:27017/Database_name"
PORT=3000
LOG_LEVEL=debug
```

Input the desired environment variables in ``` .env ```

## Start the server

```sh
npm run start
```