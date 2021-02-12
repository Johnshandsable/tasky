console.log('JS loaded');

$(document).ready(function () {
  console.log('jQuery loaded');

  // EVENT HANDLERS GO HERE
  $(document).on('click', '#btnAddTask', addTask);
});

function addTask(event) {
  event.preventDefault();
  console.log('inside addTask() ');

  $.ajax({
    url: '/tasks',
    method: 'GET',
  })
    .then(function (response) {
      // Expecting back an object of items to do
      console.table('CLIENT - A response occurred', response);
    })
    .catch(function (error) {
      console.log('CLIENT - An error occurred', error);
    });
}
