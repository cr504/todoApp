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

  /**
   * Gets all tasks associated with a listId
   * @params {*} listId   
   */
   _getTasksByListId(listId) {
    try {
      const tasks = this.tasksModel._getTasksByListId(listId);
      return tasks;
    } catch (error) {
      const errorMsg = `taskController: _getTasksByListId failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Deletes a task from the tasks array
   * @params {*} taskId
   */
  _deleteTaskByTaskId(taskId) {
    try {
      const tasks = this.tasksModel._deleteTaskByTaskId(taskId);
      return tasks;
    } catch (error) {
      const errorMsg = `taskController: _deleteTaskByTaskId failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Edits a task in the tasks array
   * @params {*} taskId
   * @params {*} body
   */
  _editTask(taskId, body) {
    try {
      const tasks = this.tasksModel._editTask(taskId, body);
      return tasks;
    } catch (error) {
      const errorMsg = `taskController: _editTask failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TaskController;
