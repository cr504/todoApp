<template>
<div>
    <v-text-field
    v-model="newTodoTitle"
    @click:append="addTodo"
    @keyup.enter="addTodo"
    class="pa-3" outlined label="Add To-do" 
    append-icon="mdi-plus-thick" hide-details clearable></v-text-field>
    <v-list v-if="todos.length" class="pt-0" flat>
      <div v-for="todo in todos" :key="todo.id">
        <v-list-item>
          <template v-slot:default>     
            
            <v-list-item-content>
              <v-list-item-title :class="{'text-decoration-line-through': (todo?.numCompleted === todo?.tasks?.length && todo?.tasks?.length > 0)}"  v-on:click="redirectToTasks(todo.id)">{{todo.title}} ({{todo?.numCompleted}} / {{todo?.tasks?.length}})</v-list-item-title>              
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
      <div class="text-h5 primary--text">No To-dos</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

  export default {    
    data() {
      return {
        serverUrl: "http://localhost:3000",
        uiUrl: "http://localhost:8080",
        newTodoTitle: '', 
        todos: [],
        errors: [],              
    }
  },

  created() {
    // Get all todos on created
    axios.get(`${this.serverUrl}/todos`)
    .then(response => {
      this.todos = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })    
  },

  methods: {    
    redirectToTasks(todoId){
      window.location.href=this.uiUrl + "/#/task/" + todoId;
    },

    addTodo() {      
      axios.post(`${this.serverUrl}/todo`, {
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
        const deletePath = `${this.serverUrl}/todo/delete/${id}`;
        axios.delete(`${deletePath}`)
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
