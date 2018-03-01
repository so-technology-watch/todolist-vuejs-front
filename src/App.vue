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
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      /> -->
      <v-spacer/>
    </v-toolbar>
    <!-- Column version -->
    <v-content>
      <div id="masonryDiv" v-masonry transition-duration="0.3s" item-selector=".item">
        <div v-masonry-tile class="item" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i">
          <taskCard :task="task" @taskEdit="taskEdit" @taskDelete="taskDelete" @statusChanged="statusChanged" />
        </div>
      </div>
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
  watch: {
    taskList: function() {
      this.$redrawVueMasonry()
    }
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
/* https://github.com/shershen08/vue-masonry */
.item {
  /* max-width: 280px;  */
  min-width: 240px;
  margin: 10px;
}
#masonryDiv {
  margin: 10px;
}
</style>
