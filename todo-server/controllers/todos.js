const TodosModel = require("../models/todos-model");
//const TasksModel = require('../models/tasks-model');

class TodosController {
  constructor() {
    this.todosModel = new TodosModel();    
  }

  /**
   * Gets a full list of todos
   * @returns array of todo objects
   */
  getAllTodos() {
    try {
      const todosWTasks = this.todosModel._getTodosWTasks();
      return todosWTasks;
    } catch (error) {
      const errorMsg = `server: GET getAllTodos failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);      
    }
  }
}

module.exports = TodosController;
