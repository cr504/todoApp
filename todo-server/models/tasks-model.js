const TasksDataService = require('../services/tasks-data-service');

class TasksModel {
  constructor() {
    this.tasksDataService = new TasksDataService();
  }

  /**
   * Gets all tasks in the tasks array
   */
  _getAllTasks() {
    try {
      // read taskData from file
      const _tasksData = this.tasksDataService._getTasksDataFromFile();
      return _tasksData;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _getAllTasks failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets all tasks after the new task has been added
   * @params {*} listId
   * @params {*} body
   */
  _addNewTask(listId, body) {
    try {
      const taskName = body.description;
      let tasks = this._getAllTasks();
      const newTaskId = tasks.length + 1;
      const isComplete = body.isComplete;
      const newTask = {
        taskId: newTaskId,
        listId: parseInt(listId),
        description: body.description,
        dueDate: body.dueDate,
        priority: body.priority,
        isComplete: isComplete,
      };
      tasks.push(newTask);
      // Save the tasks data to file
      this.tasksDataService._saveToFile(tasks);
      const tasksByListId = tasks.filter(task => task.listId === listId);
      return tasksByListId;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _addNewTask failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets all tasks associated with a listId
   * @params {*} listId
   */
   _getTasksByListId(listId) {
    try {
      let tasks = this._getAllTasks();
      tasks = tasks.filter((task) => task.listId === listId);      
      return tasks;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _getTasksByListId failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Deletes a task by the listId and taskId
   * @params {*} taskId
   */
  _deleteTaskByTaskId(listId, taskId) {
    try {
      let tasks = this._getAllTasks();
      const taskToDelete = tasks.find(task => task.listId === listId && task.taskId === taskId);
      tasks = tasks.filter((task) => task !== taskToDelete);
      // Save the tasks data to file
      this.tasksDataService._saveToFile(tasks);
      tasks = tasks.filter(task => task.listId === listId);
      return tasks;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _deleteTaskByTaskId failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets the edited task
   * @params {*} taskId
   * @params {*} body
   */
  _editTask(taskId, body) {
    try {
      const taskName = body.description;
      let tasks = this._getAllTasks();
      const _taskId = taskId;
      const _listId = parseInt(body.listId);
      const _isComplete = body.isComplete;

      const editedTask = {
        taskId: _taskId,
        listId: _listId,
        description: body.description,
        dueDate: body.dueDate,
        priority: body.priority,
        isComplete: _isComplete,
      };
      tasks = tasks.map((task) => {
        // Update the tasks array with the edited task if it's found
        if (task.listId === _listId && task.taskId === taskId) {
          return editedTask;
        }
        return task;
      });
      // Save the tasks data to file
      this.tasksDataService._saveToFile(tasks);
      tasks = tasks.filter(task => task.listId === _listId);       
      return tasks;
    } catch (error) {
      const errorMsg = `Tasks-Model: GET _editTask failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TasksModel;
