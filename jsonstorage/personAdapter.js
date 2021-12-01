"use strict";
function adapt(item) {
  console.log("personAdapter");
  return Object.assign(item, {
    id: +item.id,
    salary: +item.salary,
  });
}

module.exports = { adapt };
