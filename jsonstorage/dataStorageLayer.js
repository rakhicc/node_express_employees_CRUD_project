"use strict";
const { CODES, MESSAGES } = require("./statuscodes");
const {
  getAllFromStorage,
  getOneFromStorage,
  addtoStorage,
  updateStorage,
  removeFromstorage,
} = require("./storageLayer");

//Datastorage class

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  } //getter end

  getAll() {
    return getAllFromStorage();
  }
  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else {
        const result = await getOneFromStorage(id);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  } //getone end

  insert(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (!employee.id) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFromStorage(employee.id)) {
          reject(MESSAGES.ALREADY_IN_USE(employee.id));
        } else if (await addtoStorage(employee)) {
          resolve(MESSAGES.INSERT_OK(employee.id));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (await updateStorage(employee)) {
          resolve(MESSAGES.UPDATE_OK(employee.id));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }
  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty"));
      } else if (await removeFromstorage(id)) {
        resolve(MESSAGES.REMOVE_OK(id));
      } else {
        reject(MESSAGES.NOT_REMOVED(id));
      }
    });
  }
}; // end of class
