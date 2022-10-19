const express = require("express");
const router = express.Router();

const TodosController = require('../controllers/todos');

router.get('/todos', (req, res) => {
try {    
    const todosController = new TodosController();      
    const allTodos = todosController.getAllTodos();    
    return res.status(200).send(allTodos);    
} catch (error) {
    console.log(`server: GET todos failed ${error}`);
    res.status(500).send();
}
});


module.exports = router;
