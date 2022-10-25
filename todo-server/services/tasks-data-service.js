const fs = require("fs");
const taskDataFilePath = process.cwd() + "\\todo-server\\data\\tasks.json";

class TasksDataService {
  /**
   * Saves a task to file
   * @params {*} tasks
   */
  _saveToFile(tasks) {
    try {
      fs.writeFileSync(taskDataFilePath, JSON.stringify(tasks));
    } catch (error) {
      const errorMsg = `TasksDataService: _saveToFile failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets tasksData from file
   */
  _getTasksDataFromFile() {
    try {
      return JSON.parse(fs.readFileSync(taskDataFilePath, "utf-8"));
    } catch (error) {
      const errorMsg = `TasksDataService: _getTasksDataFromFile failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = new TasksDataService();
