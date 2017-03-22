# Hack The Ban - Border Buddy

[![Stories in Ready](https://badge.waffle.io/EmilyDev/Hack-The-Ban.png?label=ready&title=Ready)](https://waffle.io/EmilyDev/Hack-The-Ban)
[![CircleCI](https://circleci.com/gh/BorderBuddy/Border-Buddy/tree/master.svg?style=svg&circle-token=e6542681d7c1b67287fe02caf10508ed6087dd03)](https://circleci.com/gh/BorderBuddy/Border-Buddy/tree/master)

## Getting Started

Initial setup: 

### Database setup:

- Install/start postgres
 
```
$ brew install postgres
$ brew services start postgres
```

- Create database
- Note that your database name is case sensitive and must read 'BorderBuddy.' Creating a db in the command line might downcase your db name automatically.

```
$ psql -U postgres
 > CREATE DATABASE BorderBuddy;
```
- Get the `.env` file from your another team member

- Install dependencies

```
$ npm install
```

- Migrate 

```
$ npm run migrate
```

**To rollback the last migration, run:**
 
```
$ npm run migrate:undo
```

- Seed the database

```
$ npm run seed
```

**NOTE**: To generate new migrations, use the sequelize CLI:

```
$ ./node_modules/.bin/sequelize migration:create 
```

```
$ ./node_modules/.bin/sequelize --help (for other stuff)

```


### Running the app

To create the production bundle file (output as `dist/fund.js`), run:

```
$ npm run build
```

To run the API, run: 

Navigate to localhost:3000.

```
$ npm start
```

The output can be viewed at localhost:3000

For the webpack dev server, run the following.

```
$ npm run dev
```

You can now visit your dev server at localhost:8080. To interact withe API, make sure your API server is running on port 3000.
webpack-dev-server will proxy through any requests to 8080 to the API running on 3000.

## Testing

Tests use [Mocha](http://mochajs.org/) and [Chai.js](http://chaijs.com/). New tests should be included in the `test` directory (see `test/example.js` for an example test).

To execute the test suite, run `npm test`.
