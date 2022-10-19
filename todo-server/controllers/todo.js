const TodosModel = require("../models/todos-model");
//const TasksModel = require('../models/tasks-model');

class TodoController {
  constructor() {
    this.todosModel = new TodosModel();
  }

  /**
   * Gets todos length
   */
  _getTodosLength() {
    try {
      const todoLength = this.todosModel._getTodosWTasks().length;
      return todoLength;
    } catch (error) {}
  }

  /**
   * Gets a todo by id
   * @params {*} id
   * @returns todo object
   */
  _getTodoById(_id) {
    try {
      const todos = this.todosModel._getTodosWTasks();
      const todo = todos.filter((todo) => todo.id === parseInt(_id));
      return todo;
    } catch (error) {
      const errorMsg = `todoController: _getTodoById failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Adds a todo to the todos array
   * @params {*} newTodo
   * * @returns todos object with the newTodo
   */
  _addTodo(newTodo) {
    try {
      const todos = this.todosModel._addTodo(newTodo);      
      return todos;
    } catch (error) {
      const errorMsg = `todoController: _addTodo failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodoController;
