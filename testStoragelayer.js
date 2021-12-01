"use strict";
const {
  getAllFromStorage,
  getOneFromStorage,
  addtoStorage,
  updateStorage,
  removeFromstorage,
} = require("./jsonstorage/storageLayer");
//getAllFromStorage().then(console.log).catch(console.log);
//getOneFromStorage(2).then(console.log).catch(console.log);
/* const emp = {
  id: 3,
  firstname: "Rakhi",
  Lastname: "vinod",
  department: "ict",
  salary: 5000,
}; */
const emp = {
  id: "1",
  firstname: "Rakhi",
  Lastname: "Chandran",
  department: "admin",
  salary: "7000",
};
//addtoStorage(emp).then(console.log).catch(console.log);
updateStorage(emp).then(console.log).catch(console.log);
//removeFromstorage(3).then(console.log).catch(console.log);
