const TodosModel = require('../models/todos-model');

class TodosController {
  constructor() {
    const todosModel = new TodosModel();
    this.todos = todosModel.todos;
  }

  tasks = [];

  /**
   * Gets todos with tasks
   * @returns 
   */
  getTodosWTasks() {
    try {
      const todosWithTasks = this.todos.map((todo) => {
        const todoTasks = this.tasks.filter((task) => task.listId === todo.id);
        const numCompletedTasks = todoTasks.filter(
          (todoTask) => todoTask.isComplete === true
        ).length;

        todo.numCompleted = numCompletedTasks;

        return { ...todo, tasks: todoTasks };
      });
      return todosWithTasks;
    } catch (error) {
      console.log(`TodosController: getTodosWTasks failed`);
    }
  }

  /**
   * Gets a full list of todos
   * @returns array of todo objects
   */
  getAllTodos() {
    try {
      const todosWTasks = this.getTodosWTasks();
      return todosWTasks;
    } catch (error) {
        console.log(`TodosController: getAllTodos failed`);
    }
  }
}

module.exports = TodosController;
