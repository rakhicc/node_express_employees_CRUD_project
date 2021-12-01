"use strict";

function adapt(item) {
  return {
    id: +item.id, //convert string to number
    firstname: item.firstname,
    Lastname: item.Lastname,
    department: item.department,
    salary: +item.salary,
  };
}

module.exports = { adapt };
