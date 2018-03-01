<template>
  <v-card @mouseover="isHover = true" @mouseout="isHover = false">
    <v-card-title class="cardTitle">{{task.title}}</v-card-title>
    <v-card-text class="cardText" style="white-space: pre-wrap;">{{task.description}}</v-card-text>
    <v-card-actions>
      <v-btn flat small fab @click="edit">
        <v-icon v-if="isHover">edit</v-icon>
      </v-btn>
      <v-btn flat small fab @click="del">
        <v-icon v-if="isHover">delete</v-icon>
      </v-btn>
      <v-spacer/>
      <taskStatusMenu @statusChanged="statusChange" :status="task.status"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import taskStatusMenu from "./task-status-menu.vue";

export default {
  name: "task-card",
  props: ["task"],
  components: {
    taskStatusMenu
  },
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    edit() {
      this.$emit("taskEdit", this.task);
    },
    del() {
      this.$emit("taskDelete", this.task);
    },
    statusChange(status) {
      this.task.status = status;
      this.$emit("statusChanged", this.task);
    }
  }
};
</script>

<style>
.cardText {
  word-wrap: break-word;
  padding: 0 16px;
}
.cardTitle {
  font-size: 20px;
  font-weight: bold;
  word-break: break-all;
}
</style>
