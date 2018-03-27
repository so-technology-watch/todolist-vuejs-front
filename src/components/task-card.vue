<template>
  <v-card @mouseover="isHover = true" @mouseout="isHover = false" >
    <v-card-title class="cardTitle" @click="edit" v-if="task.title != ''">{{task.title}}</v-card-title>
    <v-card-text class="cardText" @click="edit" :class="{bigCardText : task.title == ''}">{{task.description}}</v-card-text>
    <v-card-actions>
      <v-btn flat small fab @click="edit">
        <v-icon v-if="isHover">edit</v-icon>
      </v-btn>
      <v-btn flat small fab @click="statusChangedTask(STATUS.deleted)"
        v-if="task.status != STATUS.deleted">
        <v-icon v-if="isHover">delete</v-icon>
      </v-btn>
      <v-btn flat small fab @click="deleteTask"
        v-if="task.status == STATUS.deleted">
        <v-icon v-if="isHover">delete</v-icon>
      </v-btn>
      <v-btn flat small fab @click="statusChangedTask(STATUS.archived)"
              v-if="task.status != STATUS.archived">
        <v-icon v-if="isHover">archive</v-icon>
      </v-btn>
      <v-spacer/>
      <taskStatusMenu @statusChangedTask="statusChangedTask" :status="task.status"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import taskStatusMenu from "./task-status-menu.vue";
import * as tools from "../tools";

export default {
  name: "task-card",
  props: ["task"],
  components: {
    taskStatusMenu
  },
  data() {
    return {
      isHover: false,
      STATUS: tools.STATUS
    };
  },
  methods: {
    edit() {
      this.$emit("taskEdit", this.task);
    },
    deleteTask() {
      this.$emit("deleteTask", this.task);
    },
    statusChangedTask(status) {
      this.task.status = status;
      this.$emit("statusChangedTask", this.task);
    }
  }
};
</script>

<style>
.cardText {
  word-wrap: break-word;
  padding: 0 16px;
  white-space: pre-wrap;
}
.bigCardText {
  word-wrap: break-word;
  padding: 15px 16px;
  white-space: pre-wrap;
  font-weight: 300;
  font-size: 35px;
}
.cardTitle {
  font-size: 20px;
  font-weight: bold;
  word-break: break-all;
}
</style>
