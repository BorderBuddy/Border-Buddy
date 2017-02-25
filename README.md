# Hack The Ban - Border Buddy
## Getting Started

Ensure `PG_PATH` in the `Makefile` is correct. If you're unsure about this, install the [Postgres App](http://postgresapp.com/).

Run the following:

```
$ npm install
$ make new
```

You're now ready to get started.

```
$ npm start
```

Navigate to localhost:3000.

For the FE dev server, run the following.

```
$ npm run dev
```

You can now visit your dev server at localhost:8080. To interact withe API, make sure your API server is running on port 3000.

Running:

```
$ npm run build
```

will create a production bundle of your JS which can be viewed at localhost:3000

## Rebuilding

Sometimes you'll need to rebuild (i.e. new npm dependencies, database changes, etc). To do this, run `$ make rebuild`. This will resolve any new npm dependencies and rebuild the database while attempting to preserve the local data (if compatible with the schema). You may need to disconnect from the postgres server for this to run correctly.

## Testing

Tests use [Mocha](http://mochajs.org/) and [Chai.js](http://chaijs.com/). New tests should be included in the `test` directory (see `test/example.js` for an example test).

To execute the test suite, run `npm test`.
