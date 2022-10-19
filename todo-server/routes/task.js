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

router.get("/task/delete/:taskId", (req, res) => {
  try {
    const taskController = new TaskController();
    const tasks = taskController._deleteTaskByTaskId(parseInt(req.params.taskId));
    return res.status(200).send(tasks);
  } catch (error) {
    const errorMsg = `server: GET task/delete/:taskId failed ${error}`;
    console.log(errorMsg);
    res.status(500).send(errorMsg);
  }
});

router.post("/task/edit/:taskId", (req, res) => {
  try {
    const taskController = new TaskController();
    const taskId = parseInt(req.params.taskId);
    const reqBody = req.body;
    const tasks = taskController._editTask(taskId, reqBody);
    return res.status(200).send(tasks);
  } catch (error) {
    const errorMsg = `server: GET task/edit/:taskId failed ${error}`;
    console.log(errorMsg);
    res.status(500).send(errorMsg);
  }
});

module.exports = router;
