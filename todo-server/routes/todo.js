const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todo");

/**
 * GET a todo object by id
 */
router.get("/todo/:id", (req, res) => {
  try {
    const todoController = new TodoController();
    const todo = todoController._getTodoById(req.params.id);
    return res.status(200).send(todo);
  } catch (error) {
    const errorMsg = `server: GET todo/:id failed ${error}`;
    console.log(errorMsg);
    res.status(500).send(errorMsg);
  }
});

/**
 * POST a todo object
 */
/*
router.post("/todo", (req, res) => {
  try {
    const todoController = new TodoController();
    const title = req.body.title;
    const id = todos.length + 1;
    const newTodo = {
      id: id,
      title: title,
    };
    todoController.addTodo(newTodo);
  } catch (error) {
    const errorMsg = `server: POST todo failed ${error}`;
    console.log(errorMsg);
    res.status(500).send(errorMsg);
  }

  //todos.push(newTodo)
  //return res.status(200).send(todos)
});
*/

module.exports = router;
