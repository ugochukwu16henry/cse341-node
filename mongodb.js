// mongodb.js

const mongoClient = require("mongodb").MongoClient;

const mongoDBIP = "192.168.1.71";
const mongoDBPort = 27017;

// Replace <mongo admin> and <password> with your actual MongoDB credentials
const mongoURL =
  "mongodb://ugochukwuhenry:1995Mobuchi@" +
  `${mongoDBIP}` +
  ":" +
  `${mongoDBPort}`;

let _db;

// Initialize and connect to the database
const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  mongoClient
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      console.log("✅ Database connected successfully");
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// Return the connected database instance
const getDb = () => {
  if (!_db) {
    throw Error("❌ Database not initialized. Call initDb first!");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
