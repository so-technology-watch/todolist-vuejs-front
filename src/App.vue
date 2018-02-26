<template>
  <v-app>
    <v-navigation-drawer fixed :clipped=true v-model="drawer" app>
      <v-list>
        <taskListItem :task="task" :value="task.title" v-for="(task, i) in taskList" :key="i" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left=true>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TodoList</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <taskCard :task="task" v-for="(task, i) in taskList" :key="i" @taskEdit="taskEdit" />
        </v-layout>
      </v-container>
      <taskDialog @closed="handleDialogClosed" :editedItem="editedItem" />
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
  methods: {
    handleDialogClosed(task) {
      this.editedItem = null;
      if (task != null) {
        if (task.id != null) {
          this.updateTask(task);
        } else {
          this.addTask(task);
        }
      }
    },
    addTask(task) {
      if (task != null) {
        restClient.Create(task).then(() => this.refreshTasks());
      }
    },
    updateTask(task) {
      if (task != null) {
        restClient.Update(task.id, task).then(() => this.refreshTasks());
      }
    },
    taskEdit(task) {
      this.editedItem = task
    },
    refreshTasks() {
      return restClient.GetAll().then(list => (this.taskList = list));
    }
  }
};
</script>
