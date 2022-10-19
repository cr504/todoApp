exports.getTodos = (req, res, next) => {
    res.status(200).send({
        id: 1,
        title: "Cohen Interview Assignment from controller",
      },)
};


/*
function getTodosWTasks() {
    const todosWithTasks = todos.map((todo) => {
        const todoTasks = tasks.filter((task) => task.listId === todo.id)
        const numCompletedTasks = todoTasks.filter(
            (todoTask) => todoTask.isComplete === true
        ).length

        todo.numCompleted = numCompletedTasks

        return { ...todo, tasks: todoTasks }
    })
    return todosWithTasks
}
*/
/*
const getTodos = (req, res, next) => {
    //const todosWTasks = getTodosWTasks()
    //res.status(200).send(todosWTasks);
    res.status(200).send(todos);
};

module.exports = { getTodos};
*/
