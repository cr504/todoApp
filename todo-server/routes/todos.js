const express = require("express");
const router = express.Router();

const { getTodos } = require("../controllers/todos");

//router.route("/todos", todosController.getTodos);
router.route('/todos').get(getTodos);

/*router.route('/todos', (req, res) => {
try {    
    const todosController = new TodoController();
    const todos = todosController.getTodosWTasks();
    return res.status(200).send(todos);
} catch (error) {
    console.log(`server: GET todos failed ${error}`);
    res.status(500).send();
}
});
*/

module.exports = router;
