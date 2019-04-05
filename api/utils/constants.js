
'use strict';

exports.URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/rolodex';
exports.PORT = process.env.PORT || 3001;
exports.SECRET = process.env.SECRET || 'super-secret-passphrase';
