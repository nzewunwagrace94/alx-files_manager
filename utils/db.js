// utils/db.js
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(this.url);
    this.db = null;

    // Connect to the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('MongoDB client connected successfully');
      })
      .catch((err) => {
        console.error('MongoDB Client Error', err);
      });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
