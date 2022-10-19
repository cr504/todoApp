class TodosController {
  //constructor() {}

  todos = [
    {
      id: 1,
      title: "Groceries",
    },
    {
      id: 2,
      title: "Reading",
    },
  ];

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
