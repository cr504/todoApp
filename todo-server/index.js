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

app.get('/task/delete/:taskId', (req, res) => {
    const taskId = req.params.taskId
    tasks = tasks.filter(task => task.taskId !== parseInt(taskId))
    return res.status(200).send(tasks)
})
*/

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
