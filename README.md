# Border Buddy

![](https://github.com/arntzy/border-buddy-development/workflows/Border%20Buddy%20CI/badge.svg)

## Getting Started

Initial setup: 

### Database setup:

- Install/start postgres. [Postgres](https://www.postgresql.org/download/)
 
- Create database
- Note that your database name is case sensitive and must read 'BorderBuddy.' Creating a db in the command line might downcase your db name automatically.

```
$ createuser postgres
$ createdb BorderBuddy
```

- Get the `.env` file from admin@borderbuddy.us
- Load the environment variables locally:

```
$ export $(cat .env | xargs)
```

- Install dependencies

```
$ npm install
```

- Bootstrap Lerna 

```
$ npm run lerna:bootstrap
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

To create the production bundle file (output as `dist/` in both packages), run:

```
$ npm run build
```

To start the production bundle (after building):

```
npm run start
```

To run the API and Client in dev mode: 

```
$ npm run dev 
```

Navigate to localhost:8000

**Note:** This loads a dummy flightstats dataset so that we don't have to hit the flightstats API with prod keys.

For the api package and webpack individually you navigate to the packages at `packages/api` or `packages/client` and run:
```
$ npm run dev
```
The api will run nodemon and the client will start a webpack dev server.

## Testing

Tests use [Mocha](http://mochajs.org/) and [Chai.js](http://chaijs.com/). We are also using Jest for testing our Redux actions.

To execute the test suite locally, run `npm test`.
