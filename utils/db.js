// utils/db.js
const { Low }      = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path         = require('path');

const file    = path.join(__dirname, '../db.json');
const adapter = new JSONFile(file);

// supply defaults so Low won’t throw
const db = new Low(adapter, { plans: [] });

module.exports = db;