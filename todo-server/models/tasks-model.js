class TasksModel {
  constructor() {
    const priority = {
        HIGH: "High",
        MEDIUM: "Medium",
        LOW: "Low"
    };

    this.tasks = [
      {
        taskId: 1,
        listId: 1,
        description: 'Description of task',
        dueDate: Date.now(),
        priority: priority.HIGH,
        isComplete: true,
      },
      {
        taskId: 2,
        listId: 1,
        description: 'Description of task 2',
        dueDate: Date.now(),
        priority: priority.LOW,
        isComplete: false,
      }   
    ];
  }
}

module.exports = TasksModel;
