const TasksDataService = require("../services/tasks-data-service");
const TodosDataService = require("../services/todos-data-service");

class TodosModel {
  constructor() {
    this.tasksDataService = new TasksDataService();
    this.todosDataService = new TodosDataService();
  }

  /**
   * Gets todos with tasks
   * @returns
   */
  _getTodosWTasks() {
    try {
      const _todosData = this.todosDataService._getTodosDataFromFile();
      const _tasksData = this.tasksDataService._getTasksDataFromFile();
      const todosWithTasks = _todosData.map((todo) => {
        const todoTasks = _tasksData.filter((task) => task.listId === todo.id);
        const numCompletedTasks = todoTasks.filter(
          (todoTask) => todoTask.isComplete === true
        ).length;

        todo.numCompleted = numCompletedTasks;

        return { ...todo, tasks: todoTasks };
      });
      return todosWithTasks;
    } catch (error) {
      const errorMsg = `Todos-Model: GET _getTodosWTasks failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Adds a todo to todos array
   * @params {*} newTodo
   */
  _addTodo(newTodo) {
    try {
      const _todosData = this.todosDataService._getTodosDataFromFile();
      _todosData.push(newTodo);
      this.todosDataService._saveToFile(_todosData);
      return _todosData;
    } catch (error) {
      const errorMsg = `Todos-Model: POST _addTodo failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodosModel;
