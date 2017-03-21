const db = require('./db');

require('./models');

db.didSync = db.sync();

module.exports = db;
