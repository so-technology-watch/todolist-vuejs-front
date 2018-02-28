<template>
  <v-list-group>
    <v-list-tile slot="item">
      <v-list-tile-action>
        <v-icon :color="taskColor" dark>check_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ task.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list-group>
</template>

<script>

import * as tools from "../tools.js"

export default {
  name: "task-listItem",
  props: ["task"],
  methods: {
    selectItem(item) {
      this.$emit("itemSelected", item)
    }
  },
  computed: {
    taskColor: tools.taskColor
  }
};
</script>
