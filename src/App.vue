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
          <taskCard :task="task" v-for="(task, i) in taskList" :key="i"/>
          <addTaskDialog @closed="addTask"/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import taskCard from "./components/task-card.vue";
import taskListItem from "./components/task-listItem.vue";
import addTaskDialog from "./components/addTask-dialog.vue";
import * as restClient from "./restClient";

export default {
  components: {
    taskListItem,
    taskCard,
    addTaskDialog
  },
  created() {
    this.refreshTasks();
  },
  data() {
    return {
      drawer: true,
      taskList: [],
      selectedItem: null
    };
  },
  methods: {
    addTask(task) {
      if (task != null) {
        restClient.Create(task).then(() => this.refreshTasks())
      }
    },
    refreshTasks() {
      return restClient.GetAll().then(list => (this.taskList = list))
    }
  }
};
</script>
