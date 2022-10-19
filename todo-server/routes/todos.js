const express = require("express");
const router = express.Router();

const TodosController = require('../controllers/todos');

router.get('/todos', (req, res) => {
try {    
    const todosController = new TodosController();      
    const allTodos = todosController.getAllTodos();        
    return res.status(200).send(allTodos);    
} catch (error) {
    const errorMsg = `server: GET todos failed ${error}`
    console.log(errorMsg);
    res.status(500).send(errorMsg);
}
});


module.exports = router;
