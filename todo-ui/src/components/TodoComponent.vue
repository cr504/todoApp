<template>
  <div>
    <h3>Todo App</h3>
    <ul v-if="todos">
      <li v-for="todo of todos">
        <p><strong>{{todo.title}}</strong></p>        
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

  export default {    
    data() {
      return {
        todos: [],
        errors: []      
    }
  },

  created() {
    axios.get(`http://localhost:3000/todos`)
    .then(response => {
      this.todos = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })    
  }
}
</script>
