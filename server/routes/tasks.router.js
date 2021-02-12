const { Router } = require('express');
const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => {
  console.log('SERVER - GET inside /tasks');
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
