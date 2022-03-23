'use strict';

const { Filemaker } = require('fms-api-client');
const { connect } = require('marpat');

const uri = process.env.MONGO_URL;
let db;
let dbPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // this avoids creating hundreds of connections to mongo
  if (!global._fmDbConnectPromise) {
    db = connect(uri);
    global._fmDbConnectPromise = db;
  }
  dbPromise = global._fmDbConnectPromise;
} else {
  // In production mode, it's best to not use a global variable.
  db = connect(uri);
  dbPromise = client.connect();
}

export async function getClient() {
  await db;
  let client;
  client = await Filemaker.findOne({});
  if (client) return client;
  console.log('client not found');
  return Filemaker.create({
    name: process.env.CLIENT_NAME,
    database: process.env.DATABASE,
    concurrency: 3,
    server: process.env.SERVER,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    // usage: process.env.CLIENT_USAGE_TRACKING
  }).save();
}
