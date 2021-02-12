console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  getTasks();
  // EVENT HANDLERS GO HERE
  $(document).on('click', '#btnAddTask', addTask);
});

function getTasks() {
  console.log('inside getTasks() ');

  $.ajax({
    url: '/tasks',
    method: 'GET',
  })
    .then(function (response) {
      // Expecting back an object of items to do
      console.table('CLIENT - GET - A response occurred', response);
      // RECEIVING A TODO LIST BACK
      for (const item of response) {
        if (item.complete) {
          $('#todoList').append(`
          <tr class="is-completed">
            <td>${item.task}</td>
            <td>&#10004;</td>
          </tr>
        `);
        } else {
          $('#todoList').append(`
          <tr>
            <td>${item.task}</td>
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

  $.ajax({
    url: '/tasks',
    method: 'POST',
  })
    .then(function (response) {
      console.log('CLIENT - POST - a response occurred', response);
    })
    .catch(function (error) {
      console.log('CLIENT - POST - an error occurred', error);
    });
}
