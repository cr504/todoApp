import { useState } from 'react'
import axios from 'axios'

import './TodoForm.scss'

export interface ITodoFormProps {
  onValidate: (title: string) => boolean
}

const TodoForm = ({
  onValidate
}: ITodoFormProps) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    

    const addTodoList = () => {
        if (onValidate(title)) {
          const params = { title }
          axios.post('todo', params)
          .then(response => console.log(response))
        } else {
          setError('Please select a unique name!')
        }
        
    }

  return (
    <form className="todo-form" >
        <input type="text" placeholder="Add a todo list" value={title} className="todo-input" onChange={(e) => setTitle(e.target.value)}/>
        <button className="todo-add" onClick={addTodoList}>Add</button>
        <div className="todo-form__error">
          {error}
        </div>
    </form>
  )
}

export default TodoForm