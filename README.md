# Border Buddy

[![Stories in Ready](https://badge.waffle.io/BorderBuddy/Border-Buddy.png?label=ready&title=Ready)](https://waffle.io/BorderBuddy/Border-Buddy)
[![CircleCI](https://circleci.com/gh/BorderBuddy/Border-Buddy/tree/master.svg?style=svg&circle-token=e6542681d7c1b67287fe02caf10508ed6087dd03)](https://circleci.com/gh/BorderBuddy/Border-Buddy/tree/master)

## Getting Started

Initial setup: 

### Database setup:

- Install/start postgres. You can find installers via the [Postgres website](https://www.postgresql.org/download/), or you can use a package manager like Homebrew:
 
```
$ brew install postgres
$ brew services start postgres
```

- Create database
- Note that your database name is case sensitive and must read 'BorderBuddy.' Creating a db in the command line might downcase your db name automatically.

```
$ createuser postgres
$ createdb BorderBuddy
$ createdb BorderBuddy_test
```

- Get the `.env` file from admin@borderbuddy.us
- Load the environment variables with `export $(cat .env | xargs)`

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
$ ./node_modules/.bin/sequelize migration:create --name [insert-name-of-migration-here]
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
$ npm start --dev
```

The output can be viewed at localhost:3000
**Note:** The `--dev` flag loads a dummy flightstats dataset so that we don't have to hit the flightstats API with prod keys.

For the webpack dev server, run the following.

```
$ npm run dev
```

You can now visit your dev server at localhost:8080. To interact withe API, make sure your API server is running on port 3000.
webpack-dev-server will proxy through any requests to 8080 to the API running on 3000.

## Testing

Tests use [Mocha](http://mochajs.org/) and [Chai.js](http://chaijs.com/). New tests should be included in the `test` directory (see `test/example.js` for an example test). We are also using Jest for testing our Redux actions.

To execute the test suite locally, run `npm run test-local`.
