// redis.js
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    // Check if the client is connected
    // this.client.on('ready', () => {
    //   console.log('Redis client connected successfully');
    // });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error('Error getting value from Redis', err);
          return reject(err);
        }
        resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          console.error('Error setting value in Redis', err);
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, response) => {
        if (err) {
          console.error('Error deleting value from Redis', err);
          return reject(err);
        }
        resolve(response === 1); // Returns 1 if a key was deleted
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
