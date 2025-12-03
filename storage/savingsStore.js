// storage/savingsStore.js
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'savings.json');

async function ensureFile() {
  await fsp.mkdir(dataDir, { recursive: true });
  try {
    await fsp.access(dataFile, fs.constants.F_OK);
  } catch {
    await fsp.writeFile(dataFile, '{}', 'utf8');
  }
}

async function load() {
  await ensureFile();
  const raw = await fsp.readFile(dataFile, 'utf8');
  try {
    return JSON.parse(raw || '{}');
  } catch {
    // If file got corrupted, reset gracefully
    await fsp.writeFile(dataFile, '{}', 'utf8');
    return {};
  }
}

async function save(obj) {
  // Atomic-ish write: write temp, then replace
  const tmp = dataFile + '.tmp';
  await fsp.writeFile(tmp, JSON.stringify(obj, null, 2), 'utf8');
  await fsp.rename(tmp, dataFile);
}

module.exports = {
  async get(userId) {
    const db = await load();
    return db[userId] || null;
  },
  async set(userId, value) {
    const db = await load();
    db[userId] = value;
    await save(db);
    return value;
  },
  async del(userId) {
    const db = await load();
    delete db[userId];
    await save(db);
  }
};