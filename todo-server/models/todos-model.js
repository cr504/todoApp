class TodosModel {
  constructor() {
    const priority = {
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low",
    };
    this.todos = [
      {
        id: 1,
        title: "Groceries",
      },
      {
        id: 2,
        title: "Reading",
      },
    ];

    this.tasks = [
      {
        taskId: 1,
        listId: 1,
        description: "Description of task 1",
        dueDate: Date.now(),
        priority: priority.HIGH,
        isComplete: true,
      },
      {
        taskId: 1,
        listId: 2,
        description: "Description of task 2",
        dueDate: Date.now(),
        priority: priority.LOW,
        isComplete: true,
      },
    ];
  }

  /**
   * Gets todos with tasks
   * @returns
   */
  _getTodosWTasks() {
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
      this.todos.push(newTodo);
      return this.todos;
    } catch (error) {
      const errorMsg = `Todos-Model: POST _addTodo failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodosModel;
