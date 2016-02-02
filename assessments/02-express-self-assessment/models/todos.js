'use strict';

// using an object to store arrays of tasks, keyed by person
var todos = {};

module.exports = {
  // removes all data from our storage
  reset: function () {
    todos = {};
  },
  // returns array of all people names
  listPeople: function () {
    return Object.keys(todos);
  },
  // adds a task to a given person
  add: function (person, task) {
    task.complete = false;
    todos[person] = todos[person] || [];
    todos[person].push(task);
    return task;
  },
  // lists all tasks for a given person
  list: function (person) {
    return todos[person];
  },
  // marks a given task for a given person as complete
  complete: function (person, index) {
    todos[person][index].complete = true;
  },
  // removes a given task for a given person
  remove: function (person, index) {
    todos[person].splice(index, 1);
  },
  // list only complete tasks for a given person
  listComplete: function (person) {
    return todos[person].filter(function(task){
      return task.complete;
    });
  },
  // lists only active tasks for a given person
  listActive: function (person) {
    return todos[person].filter(function(task){
      return !task.complete;
    });
  },
  // confirms that a task has the correct fields
  validate: function (task) {
    return Object.keys(task).every(function(field){
      return field === 'content' || field === 'complete';
    });
  }
};
