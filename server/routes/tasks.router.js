const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => {
  console.log('SERVER - GET inside /tasks');
  /*
    Basic GET route for returning the to_do_list in descending order
  */

  // TODO: Add a display option that displays uncompleted tasks first
  const sqlQuery = 'SELECT * FROM "to_do_list" ORDER BY "task" DESC';

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
}); // end GET

tasksRouter.post('/', (req, res) => {
  /*
    Basic POST route which inserts a task into the to_do_list
  */
  console.log('SERVER - POST inside /tasks');
  const newTask = req.body.taskToDo;
  const sqlQuery = `INSERT INTO "to_do_list" ("task")
  VALUES ($1)`;

  console.log('req.body:', req.body);

  // If we receive empty values, send back a 400 status
  if (newTask.task == '' || newTask.complete == '') {
    res.sendStatus(400);
    return;
  }

  pool
    .query(sqlQuery, [newTask])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
}); // end POST

tasksRouter.put('/:id/:complete', (req, res) => {
  /*
    Basic PUT route which sets the "complete" status as true if user clicks the task
  */
  console.log('SERVER - PUT inside /tasks');
  console.log('req.params:', req.params);
  const todoItemId = req.params.id;
  const todoCompleteStatus = req.params.complete;
  let sqlQuery = 'UPDATE "to_do_list" SET "complete"=TRUE WHERE "id"=$1';

  // If user clicks the task again, set the "complete" status as FALSE
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
}); // end PUT

tasksRouter.delete('/:id', (req, res) => {
  /*
    Basic DELETE route which receives id of task and deletes it if the user clicks 
    the delete button
  */
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
}); // end DELETE

tasksRouter.delete('/delete/all', (req, res) => {
  /*
    A DELETE route which allows the deletion of the entire task list without deleting
    the table itself. If the user clicks the delete all button, an alert will show up 
    and notify the user. After which, the tasks will be deleted. 
  */
  console.log('SERVER - DELETE inside /tasks/delete-all');
  const sqlQuery = `DELETE FROM "to_do_list"`;

  pool
    .query(sqlQuery, [])
    .then((result) => {
      console.log('Deleting all items from the to-do list');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting an item from the to-do list`, error);
      res.sendStatus(500);
    });
}); // end DELETE

module.exports = tasksRouter;
