const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const todos = require('./routes/todos');
const todo = require('./routes/todo');

// Base routes
app.use('/', todos);
app.use('/', todo);

/*
let todos = [
    {
        id: 1,
        title: 'Cohen Interview Assignment',
    },
]
*/

let tasks = []

const PORT = process.env.PORT || 3000

/*

app.post('/task/add/:listId', (req, res) => {
   const taskName = req.body.description
    const newTaskId = tasks.length + 1
    const newTask = {
        taskId: newTaskId,
        listId: parseInt(req.params.listId),
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        isComplete: req.body.isComplete,
    }
    tasks.push(newTask)
    return res.status(200).send(tasks)
})

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
