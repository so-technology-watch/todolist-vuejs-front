<template>
  <v-list-group>
    <v-list-tile slot="item" @click="selectItem(task)">
      <v-list-tile-action>
        <v-icon :color="task.status == 1 ? 'green' : ''" dark>check_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ task.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list-group>
</template>

<script>
export default {
  name: "todoItem",
  props: ["task"],
  methods: {
    selectItem(item) {
      this.$emit("itemSelected", item)
    }
  }
};
</script>
