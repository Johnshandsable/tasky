const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => {
  console.log('SERVER - GET inside /tasks');
  let sqlQuery = 'SELECT * FROM "to_do_list"';

  pool
    .query(sqlQuery)
    .then((result) => {
      // SEND BACK TO CLIENT TO DISPLAY TO DOM
      res.send(result.rows);
    })
    .catch((error) => {
      // ELSE SEND BACK AN ERROR
      console.log(`SERVER - GET inside /tasks - DB returning`, error);
      res.sendStatus(500);
    });
});

tasksRouter.post('/', (req, res) => {
  console.log('SERVER - POST inside /tasks');
});

tasksRouter.put('/', (req, res) => {
  console.log('SERVER - PUT inside /tasks');
});

tasksRouter.delete('/', (req, res) => {
  console.log('SERVER - DELETE inside /tasks');
});

module.exports = tasksRouter;
