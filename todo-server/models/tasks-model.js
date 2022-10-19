class TasksModel {
  constructor() {
    const priority = {
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low",
    };

    this.tasks = [
      {
        taskId: 1,
        listId: 1,
        description: "Description of task 1 listID 1",
        dueDate: Date.now(),
        priority: priority.HIGH,
        isComplete: true,
      },
      {
        taskId: 2,
        listId: 1,
        description: "Description of task 2 listID 1",
        dueDate: Date.now(),
        priority: priority.LOW,
        isComplete: false,
      },
      {
        taskId: 2,
        listId: 2,
        description: "Description of task 1 listID 2",
        dueDate: Date.now(),
        priority: priority.LOW,
        isComplete: false,
      },
    ];
  }

  /**
   * Gets all tasks in the tasks array
   */
  _getAllTasks() {
    try {
      const allTasks = this.tasks;
      return allTasks;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _getAllTasks failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TasksModel;
