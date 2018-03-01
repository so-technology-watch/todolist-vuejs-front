<template>
  <v-list-group>
    <v-list-tile slot="item">
      <v-list-tile-action>
        <taskStatusMenu @statusChanged="statusChange" :status="task.status"/>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ task.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-menu offset-y>
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list dense>
              <v-list-tile @click="edit">
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                  Edit
              </v-list-tile>
              <v-list-tile @click="del">
                <v-list-tile-action>
                  <v-icon>delete</v-icon>
                </v-list-tile-action>
                  Delete
              </v-list-tile>
            </v-list>
          </v-menu>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</template>

<script>

import * as tools from "../tools.js"
import taskStatusMenu from "./task-status-menu.vue";

export default {
  name: "task-listItem",
  props: ["task"],
  components: {
    taskStatusMenu
  },
  methods: {
    selectItem(item) {
      this.$emit("itemSelected", item)
    },
    statusChange(status) {
      this.task.status = status;
      this.$emit("statusChanged", this.task);
    },
    edit() {
      this.$emit("taskEdit", this.task);
    },
    del() {
      this.$emit("taskDelete", this.task);
    }
  },
  computed: {
    taskColor: function() {
      return tools.taskColor(this.task.status)
    }
  }
};
</script>
