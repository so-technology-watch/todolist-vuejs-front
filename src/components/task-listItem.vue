<template>
  <v-list-group>
    <v-list-tile slot="item" @click="selectItem(task)">
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
export default {
  name: "task-listItem",
  props: ["task"],
  methods: {
    selectItem(item) {
      this.$emit("itemSelected", item)
    }
  },
  computed: {
    taskColor: function() {
      switch (this.task.status) {
        case 1:
          return 'orange'
          break;
        case 2:
          return 'green'
          break;
        default:
          return ''
          break;
      }
    }
  }
};
</script>
