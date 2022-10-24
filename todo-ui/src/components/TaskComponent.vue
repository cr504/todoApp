<template>
    <v-data-table    
      :headers="headers"
      :items="tasks"      
      class="elevation-1"   
      no-data-text="No tasks"   
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Tasks</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Task
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.dueDate"
                        label="Due Date"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.priority"
                        label="Priority"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.isComplete"
                        label="Complete"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >                 
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this task?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>          
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>      
    </v-data-table> 
  </template>
    
    <script>
    export default {
      data: () => ({        
        dialog: false,
        listId: null,
        dialogDelete: false,
        headers: [
          {
            text: 'Description',
            align: 'start',
            sortable: false,
            value: 'description',
          },
          { text: 'Due Date', value: 'dueDate' },
          { text: 'Priority', value: 'priority' },
          { text: 'Complete', value: 'isComplete' },          
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        tasks: [],
        editedIndex: -1,
        editedItem: {
         description: '',
          dueDate: null,
          priority: "",
          isComplete: null,          
        },
        defaultItem: {
        description: '',
          dueDate: null,
          priority: "",
          isComplete: null,          
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.tasks = [
            {
              description: 'Task 1',
              dueDate: '10/19/22',
              priority: "High",
              isComplete: false,              
            },
            {
              description: 'Task 2',
              dueDate: '10/19/22',
              priority: "Low",
              isComplete: false,              
            },      
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.tasks.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.tasks.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.tasks.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.tasks[this.editedIndex], this.editedItem)
          } else {
            this.tasks.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>
    
    <style lang="sass">
    .no-tasks
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      opacity: 50
    </style>
    