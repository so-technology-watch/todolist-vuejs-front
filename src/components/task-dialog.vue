<template>
  <v-dialog v-model="active" max-width="500px">
    <v-btn fixed bottom fab dark right color="indigo" slot="activator" v-if="showAddButton">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-form ref="form" id="taskForm">
        <editable class="titleForm" :content="taskTitle" @update="val => title = val" placeholder="Title" />
        <editable class="descriptionForm" :content="taskDescription" @update="val => description = val" placeholder="Description" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" flat @click.native="save(true)">Ok</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import editable from "./editable.vue";
import * as tools from "../tools";
import { STATUS } from '../tools';

export default {
  name: "task-dialog",
  props: ["task", "showAddButton"],
  components: {
    editable
  },
  data() {
    return {
      active: false,
      title: "",
      description: "",
      taskDescription: "",
      taskTitle: "",
      STATUS: tools.STATUS
    };
  },
  watch: {
    active: function(val) {
      if (val == false) {
        this.taskTitle = this.title;
        this.taskDescription = this.description;
        this.close();
      } else {
        if (this.task == null) {
          this.taskTitle = "";
          this.taskDescription = "";
        }
      }
    },
    task: function(val) {
      if (val != null) {
        this.active = true;
        this.title = this.task.title;
        this.description = this.task.description;
      } else {
        this.title = "";
        this.description = "";
      }
      this.taskDescription = this.description;
      this.taskTitle = this.title;
    }
  },
  methods: {
    close: function() {
      this.$emit("closed", null);
    },
    save: function() {
      this.active = false;
      this.taskTitle = this.title;
      this.taskDescription = this.description;
      if (this.task != null && this.task.id != null) {
        let modifiedTask = this.task;
        modifiedTask.title = this.title;
        modifiedTask.description = this.description;
        modifiedTask.status = STATUS.todo;
        this.$emit("closed", modifiedTask);
      } else {
        this.$emit("closed", {
          title: this.title,
          description: this.description,
          status: STATUS.todo
        });
      }
    }
  }
};
</script>

<style>
#taskForm {
  padding-top: 20px;
}
.titleForm {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.descriptionForm {
  font-size: 16px;
}
</style>
 