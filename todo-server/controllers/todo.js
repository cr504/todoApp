const TodosModel = require("../models/todos-model");
//const TasksModel = require('../models/tasks-model');

class TodoController {
  constructor() {
    this.todosModel = new TodosModel();
  }

  /**
   * Gets a todo by id
   * @params {*} id
   * @returns todo object
   */
  getTodoById(_id) {
    try {
      const todos = this.todosModel.getTodosWTasks();
      const todo = todos.filter((todo) => todo.id === parseInt(_id));
      return todo;
    } catch (error) {
      const errorMsg = `todoController: getTodoById failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodoController;
