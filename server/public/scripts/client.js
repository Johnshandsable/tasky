console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  // Display to DOM upon loading
  getTasks();
  // EVENT HANDLERS
  // POST ROUTE HANDLER
  $(document).on('click', '#btnAddTask', addTask);
  // DELETE ROUTE HANDLER
  $(document).on('click', '.btn-outline-danger', deleteTaskFromList);
  // PUT ROUTE HANDLER incl. toggleClass
  $('tbody').on('click', 'td:first-child', updateTaskAsComplete);
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
        // console.log(item.complete);
        if (item.complete) {
          $('#todoList').append(`
          <tr class="is-completed">
            <td data-id="${item.id}" data-complete="${item.complete}" class="hvr-fade">${item.task}</td>
            <td><button type="button" data-id="${item.id}" class="btn btn-outline-danger">Delete</button></td>
          </tr>
        `);
        } else {
          $('#todoList').append(`
          <tr>
            <td data-id="${item.id}" data-complete="${item.complete}" class="hvr-fade">${item.task}</td>
            <td><button type="button" data-id="${item.id}" class="btn btn-outline-danger">Delete</button></td>
          </tr>
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

  $.ajax({
    url: '/tasks',
    method: 'POST',
    data: {
      taskToDo: $('input[name="taskToDo"]').val(),
    },
  })
    .then(function (response) {
      console.log('CLIENT - POST - a response occurred', response);
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

  $(this).parent().toggleClass('is-completed');

  $.ajax({
    url: `/tasks/${todoItemID}/${todoCompleteStatus}`,
    method: 'PUT',
  })
    .then(function (response) {
      console.log('CLIENT - PUT - a response occurred', response);
      getTasks();
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
