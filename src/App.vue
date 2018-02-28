<template>
  <v-app>
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list>
        <taskListItem :task="task" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left color="indigo" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TodoList</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <taskCard :task="task" v-for="(task, i) in sortedTaskList" :key="i" @taskEdit="taskEdit" @taskDelete="taskDelete" @statusChanged="statusChanged" />
        </v-layout>
      </v-container>
      <taskDialog @closed="handleDialogClosed" :task="editedItem" />
    </v-content>
  </v-app>
</template>

<script>
import taskCard from "./components/task-card.vue";
import taskListItem from "./components/task-listItem.vue";
import taskDialog from "./components/task-dialog.vue";
import * as restClient from "./restClient";

export default {
  components: {
    taskListItem,
    taskCard,
    taskDialog
  },
  created() {
    this.refreshTasks();
  },
  data() {
    return {
      editedItem: null,
      drawer: true,
      taskList: [],
      selectedItem: null
    };
  },
  computed: {
    sortedTaskList: function() {
      return this.taskList.sort((a, b) => {
        return a.creationDate > b.creationDate;
      });
    }
  },
  methods: {
    handleDialogClosed(task) {
      this.editedItem = null;
      if (task != null && !(task.title == "" && task.description == "")) {
        if (task.id != null) {
          this.updateTask(task);
        } else {
          this.addTask(task);
        }
      }
    },
    addTask(task) {
      restClient.Create(task).then(() => this.refreshTasks());
    },
    updateTask(task) {
      restClient.Update(task.id, task).then(() => this.refreshTasks());
    },
    taskEdit(task) {
      this.editedItem = task;
    },
    taskDelete(task) {
      restClient.Delete(task.id).then(this.refreshTasks);
    },
    statusChanged(task) {
      restClient.Update(task.id, task).then(this.refreshTasks);
    },
    refreshTasks() {
      return restClient.GetAll().then(list => (this.taskList = list));
    }
  }
};
</script>
