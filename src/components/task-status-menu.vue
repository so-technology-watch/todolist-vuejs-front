<template>
  <v-menu offset-y>
    <v-btn slot="activator" icon>
      <v-icon :color="taskColor">check_circle</v-icon>
    </v-btn>
    <v-list dense>
      <v-chip color="grey" text-color="white" @click="statusChange(0)">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
        Todo
      </v-chip>
      <v-chip color="orange" text-color="white" @click="statusChange(1)">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>Doing
      </v-chip>
      <v-chip color="green" text-color="white" @click="statusChange(2)">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
        Done
      </v-chip>
    </v-list>
  </v-menu>
</template>

<script>
import * as tools from "../tools.js";

export default {
  name: "taskStatusMenu",
  props: ["status"],
  methods: {
    statusChange(status) {
      this.$emit("statusChanged", status);
    }
  },
  computed: {
    taskColor: function() {
      return tools.taskColor(this.status);
    }
  }
};
</script>

<style>

</style>
