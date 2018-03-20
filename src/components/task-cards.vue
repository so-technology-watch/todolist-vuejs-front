<template>
    <v-content>
      <div id="masonryDiv" v-masonry transition-duration="0.3s" item-selector=".item">
        <div v-masonry-tile class="item" :value="task.title" v-for="(task, i) in taskList" :key="i">
          <taskCard :task="task" @taskEdit="taskEdit" @deleteTask="deleteTask" @statusChangedTask="statusChangedTask" />
        </div>
      </div>
      <taskDialog @closed="handleDialogClosed" :task="editedItem" :showAddButton="showAddButton"/>
    </v-content>
</template>

<script>
import taskCard from "./task-card.vue";
import taskListItem from "./task-listItem.vue";
import taskDialog from "./task-dialog.vue";

export default {
  props: [
    "taskList",
    "showAddButton"
  ],
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
  data() {
    return {
      editedItem: null,
      filteredTaskList: [],
    };
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
      if (task != null && !(task.title == "" && task.description == "")) {
        if (task.id != null) {
          this.updateTask(task);
        } else {
          this.addTask(task);
        }
      }
      //Wait until transition is finished
      setTimeout(() => {
        this.editedItem = null;
      }, 150)
    },
    addTask(task) {
      this.$emit("addTask", task)
    },
    updateTask(task) {
      this.$emit("updateTask", task)
    },
    taskEdit(task) {
      this.editedItem = task;
    },
    deleteTask(task) {
      this.$emit("deleteTask", task)
    },
    statusChangedTask(task) {
      this.$emit("statusChangedTask", task)
    },
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
