const { MongoClient } = require("mongodb");
const mongoURL =
  "mongodb+srv://ugochukwuhenry:1995Mobuchi@cluster0.9dcg7c4.mongodb.net/?appName=Cluster0";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("✅ Database already initialized.");
    return callback(null, _db);
  }

  MongoClient.connect(mongoURL)
    .then((client) => {
      _db = client;
      console.log("✅ MongoDB connection established.");
      callback(null, _db);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) throw Error("Database not initialized");
  return _db;
};

module.exports = { initDb, getDb };
