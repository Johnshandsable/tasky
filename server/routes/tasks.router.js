const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => {
  console.log('SERVER - GET inside /tasks');
  // TODO: Add a display option that displays uncompleted tasks first
  const sqlQuery = 'SELECT * FROM "to_do_list"';

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
  const newTask = req.body;
  const sqlQuery = `INSERT INTO "to_do_list" ("task", "complete")
  VALUES ($1, $2)`;

  // If we receive empty values, send back a 400 status
  if (newTask.task == '' || newTask.complete == '') {
    res.sendStatus(400);
    return;
  }

  pool
    .query(sqlQuery, [newTask.task, newTask.complete])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

tasksRouter.put('/:id/:complete', (req, res) => {
  console.log('SERVER - PUT inside /tasks');
  console.log('req.params:', req.params);
  const todoItemId = req.params.id;
  const todoCompleteStatus = req.params.complete;
  let sqlQuery = 'UPDATE "to_do_list" SET "complete"=TRUE WHERE "id"=$1';

  if (todoCompleteStatus == 'true') {
    console.log('SERVER - PUT - CompleteStatus ', todoCompleteStatus);
    sqlQuery = 'UPDATE "to_do_list" SET "complete"=FALSE WHERE "id"=$1';
  }

  pool
    .query(sqlQuery, [todoItemId])
    .then((result) => {
      console.log('SERVER - PUT inside /tasks/id. Everything went OK!');
      res.sendStatus(200); // OK
    })
    .catch((error) => {
      // ELSE SEND BACK AN ERROR
      console.log(`SERVER - PUT inside /tasks - DB returning`, error);
      res.sendStatus(500);
    });
});

tasksRouter.delete('/:id', (req, res) => {
  console.log('SERVER - DELETE inside /tasks');

  const todoItemId = req.params.id;
  const sqlQuery = `DELETE FROM "to_do_list" WHERE "id"=$1`;

  pool
    .query(sqlQuery, [todoItemId])
    .then((result) => {
      console.log('Deleting a item from the to-do list with id:', todoItemId);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting an item from the to-do list`, error);
      res.sendStatus(500);
    });
});

module.exports = tasksRouter;
