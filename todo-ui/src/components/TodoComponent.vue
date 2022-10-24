<template>
<div>
    <v-text-field
    v-model="newTodoTitle"
    @click:append="addTodo"
    @keyup.enter="addTodo"
    class="pa-3" outlined label="Add Todo" 
    append-icon="mdi-plus-thick" hide-details clearable></v-text-field>
    <v-list v-if="todos.length" class="pt-0" flat>
      <div v-for="todo in todos" :key="todo.id">
        <v-list-item>
          <template v-slot:default>     
            
            <v-list-item-content>
              <v-list-item-title><a href="http://localhost:8080/#/task">{{todo.title}}</a></v-list-item-title>
            </v-list-item-content>            

            <v-list-item-action>
              <v-btn @click.stop="deleteTodo(todo.id, todo.title)" icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>

          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <div v-else
    class="no-todos">
      <v-icon      
      color="primary"
      size="100"
    >
      mdi-check
    </v-icon>
      <div class="text-h5 primary--text">No todos</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

  export default {    
    data() {
      return {
        baseUrl: "http://localhost:3000",
        newTodoTitle: '', 
        todos: [],
        errors: []      
    }
  },

  created() {
    // Get all todos on created
    axios.get(`${this.baseUrl}/todos`)
    .then(response => {
      this.todos = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })    
  },

  methods: {    
    addTodo() {      
      axios.post(`${this.baseUrl}/todo`, {
        title: this.newTodoTitle,
      })
      .then(response => {
        this.newTodoTitle = ''
        this.todos = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })                  
    },

    deleteTodo(id, title) {
      if (confirm(`Delete todo ${title}?`)) {
        const deletePath = `${this.baseUrl}/todo/delete/${id}`;
        axios.get(`${deletePath}`)
        .then(response => {
          this.todos = response.data
        })        
      }      
    },
  }
}
</script>

<style lang="sass">
.no-todos
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  opacity: 50
</style>
