const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const todos = require('./routes/todos');
const todo = require('./routes/todo');
const task = require('./routes/task');

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Base routes
app.use('/', todos);
app.use('/', todo);
app.use('/', task);

const PORT = process.env.PORT || 3000

/*

app.post('/task/edit/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId)
    const listId = parseInt(req.body.listId)
    const editedTask = {
        taskId: taskId,
        listId: listId,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        isComplete: req.body.isComplete,
    }
    tasks = tasks.map((task) => {
        if (task.listId === listId && task.taskId === taskId) {
            return editedTask
        }
        return task
    })
    return res.status(200).send(tasks)
})

app.get('/task/delete/:taskId', (req, res) => {
    const taskId = req.params.taskId
    tasks = tasks.filter(task => task.taskId !== parseInt(taskId))
    return res.status(200).send(tasks)
})
*/

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
