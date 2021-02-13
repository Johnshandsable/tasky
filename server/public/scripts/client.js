console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  // Display to DOM upon loading
  getTasks();
  // EVENT HANDLERS
  // POST ROUTE HANDLER
  $(document).on('click', '#btnAddTask', addTask);
  // DELETE ROUTE HANDLER
  $(document).on('click', '.btn-outline-warning', deleteTaskFromList);
  // DELETE ALL ROUTE HANDLER
  $(document).on('click', '#btnDeleteTasks', deleteAllTasksFromList);
  // PUT ROUTE HANDLER incl. toggleClass
  $('#todoList').on('click', 'span', updateTaskAsComplete);
});

function getTasks() {
  console.log('inside getTasks() ');
  $('#todoList').empty();

  $.ajax({
    url: '/tasks',
    method: 'GET',
  })
    .then(function (response) {
      // Expecting back an object of items to do
      console.table('CLIENT - GET - A response occurred', response);
      // RECEIVING A TODO LIST BACK
      for (const item of response) {
        if (item.complete == true) {
          console.log('CLIENT - GET, ', item.complete);
          // Add extra class with strike-through effect
          $('#todoList').append(`
            <li class="list-group-item is-completed"><span data-id="${item.id}" data-complete="${item.complete}">${item.task}</span>
            <button type="button" data-id="${item.id}" class="btn-sm btn-outline-warning">Delete</button></li>
        `);
        } else {
          $('#todoList').append(`
          <li class="list-group-item"><span data-id="${item.id}" data-complete="${item.complete}">${item.task}</span>
            <button type="button" data-id="${item.id}" class="btn-sm btn-outline-warning">Delete</button></li>
          `);
        } // end for
      } // end then
    }) // end ajax call
    .catch(function (error) {
      console.log('CLIENT - GET - An error occurred', error);
    });
} // end getTasks()

function addTask(event) {
  event.preventDefault();
  console.log('inside addTask() ');
  console.log('inputting task:', $('input[name="taskToDo"]').val());

  /*
    Add validation so user cannot submit empty field
  */

  $.ajax({
    url: '/tasks',
    method: 'POST',
    data: {
      taskToDo: $('input[name="taskToDo"]').val(),
    },
  })
    .then(function (response) {
      console.log('CLIENT - POST - a response occurred', response);
      clearInputs();
      getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT - POST - an error occurred', error);
    });
} // end addTasks()

function updateTaskAsComplete() {
  console.log('inside updateTaskAsComplete');
  console.log('id:', $(this).data('id'));
  console.log('complete:', $(this).data('complete'));
  const todoItemID = $(this).data('id');
  const todoCompleteStatus = $(this).data('complete');

  console.log($(this));
  $(this).toggleClass('is-completed');

  $.ajax({
    url: `/tasks/${todoItemID}/${todoCompleteStatus}`,
    method: 'PUT',
  })
    .then(function (response) {
      console.log('CLIENT - PUT - a response occurred', response);
      // getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT - PUT - an error occurred', error);
    });
} // end updateTasksAsComplete

function deleteTaskFromList() {
  console.log('inside deleteTaskFromList');
  const todoItemID = $(this).data('id');

  $.ajax({
    url: `/tasks/${todoItemID}`,
    method: 'DELETE',
  })
    .then(function (response) {
      console.log('CLIENT - DELETE - a response occurred', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT - DELETE - an error occurred', error);
    });
} // end deleteTaskFromList

function deleteAllTasksFromList(event) {
  event.preventDefault();
  console.log('inside deleteAllTasksFromList');

  $.ajax({
    url: `/tasks/delete/all`,
    method: 'DELETE',
  })
    .then(function (response) {
      console.log('CLIENT - DELETE - a response occurred', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT - DELETE - an error occurred', error);
    });
} // end deleteAllTasksFromList

function clearInputs() {
  $('input[name="taskToDo"]').val('');
} // end clearInputs
