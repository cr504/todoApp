const express = require("express");
const router = express.Router();

const TodoController = require('../controllers/todo');

router.get('/todo/:id', (req, res) => {
try {      
    const todoController = new TodoController();      
    const todo = todoController.getTodoById(req.params.id);        
    return res.status(200).send(todo);    
} catch (error) {
    const errorMsg = `server: GET todo/:id failed ${error}`
    console.log(errorMsg);
    res.status(500).send(errorMsg);
}
});


module.exports = router;
