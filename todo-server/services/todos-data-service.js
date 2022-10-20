const fs = require("fs");
const todosDataFilePath = process.cwd() + "\\todo-server\\data\\todos.json";

class TodosDataService {
  /**
   * Saves todos to file
   * @params {*} todos
   */
  _saveToFile(todos) {
    try {
      fs.writeFileSync(todosDataFilePath, JSON.stringify(todos));
    } catch (error) {
      const errorMsg = `TodosDataService: _saveToFile failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }

  /**
   * Gets todos from file
   */
  _getTodosDataFromFile() {
    try {
      return JSON.parse(fs.readFileSync(todosDataFilePath, "utf-8"));
    } catch (error) {
      const errorMsg = `TodosDataService: _getTodosDataFromFile failed ${error}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    }
  }
}

module.exports = TodosDataService;
