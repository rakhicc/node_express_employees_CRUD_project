"use strict";
const { readStorage, writeStorage } = require("./jsonstorage/readerWriter");
readStorage("./jsonstorage/employees.json")
  .then(console.log)
  .catch(console.log);
//if you povide folder name before json file this will fail if such folder doesn't exists.
writeStorage("./test.json", { a: 2, b: 4 })
  .then(console.log)
  .catch(console.log);
readStorage("./test.json")
  .then((data) => Object.assign(data, { c: 356 }))
  .then((modified) => writeStorage("./test.json", modified))
  .then(console.log)
  .catch(console.log);
