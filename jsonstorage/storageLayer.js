"use strict";
const path = require("path");

const { readStorage, writeStorage } = require("./readerWriter");
const { storageFile, adapterFile } = require("./storageConfig.json");
const { adapt } = require(path.join(__dirname, adapterFile));
const storageFilePath = path.join(__dirname, storageFile);

async function getAllFromStorage() {
  return readStorage(storageFilePath);
}
async function getOneFromStorage(id) {
  const storage = await readStorage(storageFilePath);
  return storage.find((item) => item.id == id) || null; //if does not find item null is returned
}

async function addtoStorage(newobj) {
  const storage = await readStorage(storageFilePath);
  storage.push(adapt(newobj));
  return await writeStorage(storageFilePath, storage);
}
async function updateStorage(updatedObject) {
  const storage = await readStorage(storageFilePath);
  const oldObject = storage.find((item) => item.id == updatedObject.id);
  if (oldObject) {
    Object.assign(oldObject, adapt(updatedObject)); //this oldobj is updated with updatedObject,if there are extra fields in updatedobj that will be added to the oldobj,the remaining fields in ildobj is still there

    return await writeStorage(storageFilePath, storage);
  }
  return false;
}
async function removeFromstorage(id) {
  const storage = await readStorage(storageFilePath);
  const index = storage.findIndex((item) => item.id == id); //findindex class will return index
  if (index < 0) return false;
  storage.splice(index, 1); //removing one item at the index i
  return await writeStorage(storageFilePath, storage);
}
module.exports = {
  getAllFromStorage,
  getOneFromStorage,
  addtoStorage,
  updateStorage,
  removeFromstorage,
};
