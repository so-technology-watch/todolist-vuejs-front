<template>
  <v-app>
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list>
        <taskListItem :task="task" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i" 
        @statusChanged="statusChanged" 
        @taskEdit="taskEdit" 
        @taskDelete="taskDelete" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left color="indigo" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TodoList</v-toolbar-title>
    </v-toolbar>
    <!-- Column version -->
    <v-content style="display:block;">
      <div id="columns">
        <div class="task" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i">
          <taskCard :task="task" @taskEdit="taskEdit" @taskDelete="taskDelete" @statusChanged="statusChanged" />
        </div>
      </div>
      <!-- Flex version -->
      <!-- <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs3 :value="task.title" v-for="(task, i) in sortedTaskList" :key="i">
            <taskCard :task="task" @taskEdit="taskEdit" @taskDelete="taskDelete" @statusChanged="statusChanged" />
          </v-flex>
        </v-layout>
      </v-container> -->
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

<style>
#columns {
  column-width: 240px;
  column-count: 4;
  column-fill: balance;
  width: 90%;
  margin: 25px auto;
}
div.task {
  width: 240px;
  margin: 7px;
  display: inline-block;
}
</style>
