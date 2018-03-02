<template>
  <v-app>
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list>
        <taskListItem :task="task" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i" @statusChanged="statusChanged" @taskEdit="taskEdit" @taskDelete="taskDelete" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left color="indigo" dark>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        TodoList
      </v-toolbar-title>
      <v-toolbar-items id="searchBar">
        <v-text-field solo-inverted prepend-icon="search" label="Search" v-model="searchText" clearable flat color="white" :loading="searchLoading"/>
      </v-toolbar-items>
      <v-spacer/>
    </v-toolbar>
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
      this.$redrawVueMasonry();
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
      filteredTaskList: [],
      selectedItem: null,
      searchText: "",
      searchLoading: false
    };
  },
  watch: {
    searchText: function(val) {
      this.refreshFilteredList()
    },
    taskList: function(val) {
      this.refreshFilteredList()
    }
  },
  computed: {
    sortedTaskList: function() {
      return this.filteredTaskList.sort((a, b) => {
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
    },
    refreshFilteredList() {
      if (this.searchText != null && this.searchText != "") {
        this.searchLoading = true
        this.filteredTaskList = this.taskList.filter(task => {
          return task.title.includes(this.searchText) || task.description.includes(this.searchText)
        })
        this.searchLoading = false
      }
      else {
        this.filteredTaskList = this.taskList
      }
    }
  }
};
</script>

<style>
/* https://github.com/shershen08/vue-masonry */
.item {
  width: 240px;
  /* max-width: 280px; 
  min-width: 240px; */
  margin: 10px;
}
#masonryDiv {
  margin: 10px;
}
#searchBar {
  margin-left: 150px;
  width: 40%;
}
</style>
