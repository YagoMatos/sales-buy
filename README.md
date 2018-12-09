# Sales&buy (alpha version)

### Technologies:
- React
- ES6
- Bootstrap
- Node
- MongoDB


### Intallation
To use this project, follow the next step, on linux, windows or mac terminal:
You will need of Yarn (https://yarnpkg.com/lang/en/docs/install/#debian-stable) Node.js v9.10.0 (https://nodejs.org/en/) and MongoDB (https://www.mongodb.com/) installed.

### Start Development

1) git clone https://github.com/YagoMatos/sales-buy

    ```sh
    $ git clone https://github.com/YagoMatos/sales-buy
    ```

2) Enter in folder backend and frontend, and run yarn

    ```sh
    $ cd backend 
    $ yarn
    $ cd ..
    $ cd frontend
    $ yarn
    ```

3) Open a instance on MongoDB with the command mongod on command line:
    
    ```sh
    $ mongod
    ```
4) Create a database called codewave
 - With mongod active, running the command mongo, to open the sgbd
 
    ```sh
    $ mongo
    $ use auction
    $ exit
    ```
5) In folder backend (the previous step completed need) run command line node src/index.js 

    ```sh
    $ cd backend
    $ node src/index.js
    ```

6) In folder frontend (the previous step completed need) run on command line yarn 

    ```sh
    $ cd frontend
    $ yarn start
    ```
 
