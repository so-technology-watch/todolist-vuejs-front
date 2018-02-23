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
          <v-btn fixed absolute bottom fab dark right @click.native="addTask()" color="indigo">
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import taskCard from "./components/task-card.vue";
import taskListItem from "./components/task-listItem.vue";
import * as restClient from "./restClient";

export default {
  components: {
    taskListItem,
    taskCard
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
    addTask() {
      restClient.Create(
        {
          title: "newTask",
          description: "new Description"
        },
        this.refreshTasks
      );
    },
    refreshTasks() {
      restClient.GetAll(list => (this.taskList = list));
    }
  }
};
</script>
