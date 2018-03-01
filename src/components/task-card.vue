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
      <v-menu>
        <v-btn slot="activator" icon>
          <v-icon :color="taskColor">check_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="statusChange(0)">
            <v-icon>check_circle</v-icon>
            <v-list-tile-title> Todo</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="statusChange(1)">
            <v-icon color="orange">check_circle</v-icon>
            <v-list-tile-title> Doing</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="statusChange(2)">
            <v-icon color="green">check_circle</v-icon>
            <v-list-tile-title> Done</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as tools from "../tools.js";

export default {
  name: "task-card",
  props: ["task"],
  data() {
    return {
      isHover: false
    };
  },
  computed: {
    taskColor: tools.taskColor
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
