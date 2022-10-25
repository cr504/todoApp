<template>
    <v-data-table :headers="headers" :items="tasks" class="elevation-1" no-data-text="No tasks">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Tasks</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.description" label="Description">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.priority" :items="priorityChoices"
                                            label="Priority"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.isComplete" :items="completeChoices"
                                            label="Complete"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                            :return-value.sync="date" transition="scale-transition" offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="editedItem.dueDate" label="Due Date"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                </v-text-field>
                                            </template>
                                            <v-date-picker v-model="editedItem.dueDate" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.menu.save(editedItem.dueDate)">
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>                                        
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn :disabled="!allRequiredTaskFieldsValid" color="blue darken-1" text @click="save">
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
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>
    
<script>
import axios from 'axios';

export default {
    data: () => ({
        serverUrl: "http://localhost:3000",
        dialog: false,
        listId: null,
        errors: [],
        priorityChoices: ["High", "Medium", "Low"],
        completeChoices: [false, true],
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
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,        
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
        },

        allRequiredTaskFieldsValid(){
            const isValid = (this.editedItem.description !== '' && this.editedItem.priority && this.editedItem.isComplete !== null && this.editedItem.dueDate)
            return isValid;
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.listId = this.$route.params.id;
        this.initialize()
    },

    methods: {
        initialize() {
            // Get all the tasks by listId
            const getTasksPath = `${this.serverUrl}/task/${this.listId}`;
            axios.get(`${getTasksPath}`, {
            })
                .then(response => {
                    this.tasks = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

        editItem(item) {
            this.editedIndex = this.tasks.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.tasks.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            const deletePath = `${this.serverUrl}/task/delete/${this.listId}/${this.editedItem.taskId}`;
            axios.delete(`${deletePath}`, {
                listId: this.listId,
            })
                .then(response => {
                    this.tasks = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {           
            // Editing a task
            if (this.editedIndex > -1) {
                const editPath = `${this.serverUrl}/task/edit/${this.editedItem.taskId}`;
                axios.post(`${editPath}`, {
                    taskId: this.editedItem.taskId,
                    listId: this.listId,
                    description: this.editedItem.description,
                    dueDate: this.editedItem.dueDate,
                    priority: this.editedItem.priority,
                    isComplete: this.editedItem.isComplete,
                })
                    .then(response => {
                        this.tasks = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
            // Adding a task
            else {
                const addPath = `${this.serverUrl}/task/add/${this.listId}`;
                axios.post(`${addPath}`, {
                    taskId: this.tasks.length + 1,
                    listId: this.listId,
                    description: this.editedItem.description,
                    dueDate: this.editedItem.dueDate,
                    priority: this.editedItem.priority,
                    isComplete: this.editedItem.isComplete,
                })
                    .then(response => {
                        this.tasks = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
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
    