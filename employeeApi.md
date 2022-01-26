# Employee data storage

## Node js project

## employees.json

The id is unique

```json
[
  {
    "id": 1,
    "firstname": "Leila",
    "Lastname": "Hokki",
    "department": "ict",
    "salary": 4000
  },
  {
    "id": 2,
    "firstname": "Matt",
    "Lastname": "River",
    "department": "ict",
    "salary": 4000
  }
]
```

### Public API(methods of Datastorage)

##### dataSorageLayer.js

- getAll()

  - returns an array of all employees / []

- getOne(id)

  - returns an employee object / NOT_FOUND

- insert(newEmployee)

  - returns INSERT_OK / NOT_INSERTED / ALREADY_IN USE

- update(updatedEmployee)

  - returns UPDATE_OK / NOT_UPDATED

- remove(id)

  - returns REMOVE_OK / NOT_FOUND / NOT_REMOVED

- getter for status codes
  - returns status codes

### Private API

#### readerWriter.js

- readStorage(storageFile)

  - returns anarrey of employees / []

- writeStorage(storageFile, data)

  - returns true / false

  ### storageLayer.js

  - getAllFromStorage()

    - returns an array of employyes / []

  - getOneFromStorage(id)
  - returns an employee object / null

  - addToStorage(newEmployee)

    - returns true /false

  - updatedStorage(updatedEmployee)

    - returns true/false

  - removeFromStorage(id)
    - returns true/false

### status coded and messages

```js
const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:!,
    INSERT_OK:2,
    ....
}
```

The format of status message is:

(status types are `error` or `info`)

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }), //returns an object value use parenthesis for implicit
  NOT_FOUND: (id) => ({
    message: `No employee found with id ${id}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id =>( {
    message: `Employee ${id}was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
};
```
