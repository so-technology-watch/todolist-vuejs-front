<template>
  <v-menu offset-y>
    <v-btn slot="activator" icon>
      <v-icon :color="taskColor(STATUS.todo)" v-if="status >= STATUS.archived">restore</v-icon>
      <v-icon :color="taskColor(status)" v-else>check_circle</v-icon>
    </v-btn>
    <v-list dense>
      <v-chip :color="taskColor(STATUS.doing)" text-color="white" @click="statusChange(STATUS.doing)" v-if="status != STATUS.doing">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>Doing
      </v-chip>
      <v-chip :color="taskColor(STATUS.done)" text-color="white" @click="statusChange(STATUS.done)" v-if="status != STATUS.done">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
        Done
      </v-chip>
      <v-chip :color="taskColor(STATUS.todo)" text-color="white" @click="statusChange(STATUS.todo)" v-if="status != STATUS.todo">
        <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
        Todo
      </v-chip>
    </v-list>
  </v-menu>
</template>

<script>
import * as tools from "../tools.js";

export default {
  name: "taskStatusMenu",
  props: ["status"],
  data() {
    return {
      STATUS: tools.STATUS
    };
  },
  methods: {
    statusChange(status) {
      this.$emit("statusChangedTask", status);
    },
    taskColor: tools.taskColor
  }
};
</script>

<style>

</style>
