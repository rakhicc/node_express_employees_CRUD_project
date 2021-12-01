"use strict";
const fs = require("fs").promises;
async function readStorage(storagefilePath) {
  try {
    const data = await fs.readFile(storagefilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
async function writeStorage(storagefilePath, data) {
  try {
    await fs.writeFile(storagefilePath, JSON.stringify(data, null, 4), {
      encoding: "utf8",
      flag: "w",
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
module.exports = { readStorage, writeStorage };
