const fs = require("fs");
const todosDataFilePath = process.cwd() + "\\todo-server\\data\\todos.json";
const taskDataFilePath = process.cwd() + "\\todo-server\\data\\tasks.json";

class TodosModel {

  /**
   * Gets todos with tasks
   * @returns
   */
  _getTodosWTasks() {
    try {
      const _todosData = this._getTodosDataFromFile();
      const _tasksData = this._getTasksDataFromFile();
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
      const _todosData = this._getTodosDataFromFile();
      _todosData.push(newTodo);
      this._saveTodoToFile(_todosData);
      return _todosData;
    } catch (error) {
      const errorMsg = `Todos-Model: POST _addTodo failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets todosData from file
   */
  _getTodosDataFromFile() {
    try {
      return JSON.parse(fs.readFileSync(todosDataFilePath, "utf-8"));
    } catch (error) {
      const errorMsg = `Tasks-Model: _getTodosDataFromFile failed ${error}`;
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
        const errorMsg = `Tasks-Model: _getTasksDataFromFile failed ${error}`;
        console.log(errorMsg);
        res.status(500).send(errorMsg);
      }
    }

    /**
   * Saves a todo to file
   * @params {*} tasks
   */
  _saveTodoToFile(todo) {
    try {
      fs.writeFileSync(todosDataFilePath, JSON.stringify(todo));
    } catch (error) {
      const errorMsg = `Tasks-Model: _saveToFile failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodosModel;
