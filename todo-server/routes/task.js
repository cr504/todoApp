const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/task");

router.get("/task/add/:listId", (req, res) => {
  try {
    const taskController = new TaskController();
    const listId = parseInt(req.params.listId);
    const reqBody = req.body;
    const tasks = taskController._addNewTask(listId, reqBody);
    return res.status(200).send(tasks);
  } catch (error) {
    const errorMsg = `server: GET task/add/:listId failed ${error}`;
    console.log(errorMsg);
    res.status(500).send(errorMsg);
  }
});

module.exports = router;
