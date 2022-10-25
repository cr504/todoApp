const TodosModel = require("../models/todos-model");
const TodosDataService = require("../services/todos-data-service");

const TasksModel = require("../models/tasks-model");
const TasksDataService = require("../services/tasks-data-service");

class TodoController {
  constructor() {
    this.todosModel = new TodosModel();
    this.todosDataService = new TodosDataService();
    this.tasksModel = new TasksModel();
    this.tasksDataService = TasksDataService;
  }

  /**
   * Gets todos length
   */
  _getTodosLength() {
    try {
      const todoLength = this.todosModel._getTodosWTasks().length;
      return todoLength;
    } catch (error) {
      const errorMsg = `todoController: _getTodosLength failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
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

  /** Gets the totos array after a todo has been deleted
   * @params {*} listId
   * @returns todo object
   */
  _deleteTodoById(_listId) {
    try {
      let todos = this.todosModel._getTodosWTasks();
      let tasks = this.tasksModel._getAllTasks();
      const listId = _listId;
      // Filter out the todos associated with the listId
      todos = todos.filter((todo) => todo.id !== parseInt(listId));
      // Save the new todos to file
      this.todosDataService._saveToFile(todos);
      // Filter out the tasks associated with the listId
      tasks = tasks.filter((task) => task.listId !== parseInt(listId));
      // Save new tasks to file
      this.tasksDataService._saveToFile(tasks);
      return todos;
    } catch (error) {
      const errorMsg = `todoController: _deleteTodoById failed ${error}`;
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
