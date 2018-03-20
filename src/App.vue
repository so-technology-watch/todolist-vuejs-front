<template>
  <v-app>
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-list class="drawer-menu">
        <!-- <taskListItem :task="task" :value="task.title" v-for="(task, i) in sortedTaskList" :key="i" @statusChangedTask="statusChangedTask" @taskEdit="taskEdit" @taskDelete="taskDelete" /> -->
        <v-list-tile @click="view = 'myTasks'">
          <v-icon>check_box</v-icon>
          <v-list-tile-title>My Tasks</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="view = 'archives'">
          <v-icon>archive</v-icon>
          <v-list-tile-title>Archives</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="view = 'trash'">
          <v-icon>delete</v-icon>
          <v-list-tile-title>Trash</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left color="indigo" dark>
      <v-toolbar-title class="hidden-sm-and-down">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        TodoList
      </v-toolbar-title>
      <v-toolbar-items id="searchBar">
        <v-text-field solo-inverted prepend-icon="search" label="Search" v-model="searchText" clearable flat color="white" :loading="searchLoading" />
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon fab @click="emptyTrash" v-if="view == 'trash'">
        <v-icon large>delete_sweep</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <taskCards :task-list="archivesList" :showAddButton="false" v-if="view == 'archives'" @updateTask="updateTask" @deleteTask="deleteTask" @statusChangedTask="statusChangedTask"></taskCards>
    <taskCards :task-list="trashList" :showAddButton="false" v-else-if="view == 'trash'" @updateTask="updateTask" @deleteTask="deleteTask" @statusChangedTask="statusChangedTask"></taskCards>
    <taskCards :task-list="myTasksList" :showAddButton="true" v-else @addTask="addTask" @updateTask="updateTask" @deleteTask="deleteTask" @statusChangedTask="statusChangedTask"></taskCards>
    <v-alert :type="alertType" v-model="alert" outline transition="slide-y-reverse-transition">
      {{alertMessage}}
    </v-alert>
  </v-app>
</template>

<script>
import taskCards from "./components/task-cards.vue";
import taskListItem from "./components/task-listItem.vue";
import * as restClient from "./restClient";
import * as tools from "./tools";

export default {
  components: {
    taskCards,
    taskListItem
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
      drawer: true,
      taskList: [],
      filteredTaskList: [],
      searchText: "",
      searchLoading: false,
      view: "myTasks",
      STATUS: tools.STATUS,
      alert: false,
      alertType: "info",
      alertMessage: ""
    };
  },
  watch: {
    searchText: function(val) {
      this.refreshFilteredList();
    },
    taskList: function(val) {
      this.refreshFilteredList();
    }
  },
  computed: {
    sortedTaskList: function() {
      return this.filteredTaskList.sort((a, b) => {
        return a.creationDate > b.creationDate;
      });
    },
    myTasksList: function() {
      return this.filteredTaskList.filter(t => t.status < this.STATUS.archived);
    },
    archivesList: function() {
      return this.filteredTaskList.filter(
        t => t.status == this.STATUS.archived
      );
    },
    trashList: function() {
      return this.filteredTaskList.filter(t => t.status == this.STATUS.deleted);
    }
  },
  methods: {
    addTask(task) {
      restClient
        .Create(task)
        .then(serverTask => this.taskList.push(serverTask))
        .catch(error => {
          this.addAlert("Connection failure", "error");
        });
    },
    updateTask(task) {
      this.taskList.filter(t => t.id == task.id)[0] = task;
      restClient
        .Update(task.id, task)
        .then(
          serverTask =>
            (this.taskList.filter(t => t.id == task.id)[0] = serverTask)
        )
        .catch(error => {
          this.addAlert("Connection failure", "error");
        });
    },
    deleteTask(task) {
      this.taskList = this.taskList.filter(item => item != task);
      restClient
        .Delete(task.id)
        .then(() => this.addAlert("Task was successfully deleted", "info"))
        .catch(error => {
          this.addAlert("Connection failure", "error");
        });
    },
    emptyTrash() {
      this.addAlert("Trash was emptied successfully", "info");
      this.trashList.forEach(task => {
        restClient.Delete(task.id);
      });

      this.taskList = this.taskList.filter(
        item => item.status != this.STATUS.deleted
      );
    },
    statusChangedTask(task) {
      if (task.status == this.STATUS.deleted) {
        this.addAlert("Task was moved to trash", "info");
      } else if (task.status == this.STATUS.archived) {
        this.addAlert("Task was moved to archives", "info");
      }
      this.taskList.filter(t => t.id == task.id)[0] = task;
      restClient.Update(task.id, task);
    },
    refreshTasks() {
      return restClient
        .GetAll()
        .then(list => {
          this.taskList = list;
        })
        .catch(error => {
          this.addAlert("Connection failure", "error");
        });
    },
    refreshFilteredList() {
      if (this.searchText != null && this.searchText != "") {
        this.searchLoading = true;
        this.filteredTaskList = this.taskList.filter(task => {
          return (
            task.title.includes(this.searchText) ||
            task.description.includes(this.searchText)
          );
        });
        this.searchLoading = false;
      } else {
        this.filteredTaskList = this.taskList;
      }
    },
    addAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      this.alert = true;
      setTimeout(() => {
        if (this.alert) {
          this.alert = false;
          setTimeout(() => {
            this.alertMessage = "";
          }, 200);
        }
      }, 5000);
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
.drawer-menu .list__tile .icon {
  margin-right: 30px;
}
</style>
