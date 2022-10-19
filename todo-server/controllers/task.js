const TasksModel = require("../models/tasks-model");

class TaskController {
  constructor() {
    this.tasksModel = new TasksModel();
  }

  /**
   * Adds a task to the tasks array
   * @params {*} listId
   * @params {*} body
   */
  _addNewTask(listId, body) {
    try {      
      const tasks = this.tasksModel._addNewTask(listId, body);      
      return tasks;
    } catch (error) {
      const errorMsg = `taskController: _addNewTask failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TaskController;
