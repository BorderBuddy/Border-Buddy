const db = require('./db');

require('./models');

db.didSync = db.authenticate();

module.exports = db;
