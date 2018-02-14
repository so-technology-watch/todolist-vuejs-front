<template>
  <v-list-group :value="list.isActive">
    <v-list-tile slot="item" @click="list.isActive = !list.isActive">
      <v-list-tile-action>
        <v-icon :color="list.isDone ? 'teal' : ''" dark>done_all</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ list.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-list-tile v-for="subItem in list.items" :key="subItem.title" @click="selectItem(subItem)">
      <v-list-tile-content>
        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon :color="subItem.isDone ? 'teal' : ''" dark
                @click="isDoneChanged(subItem)">check_circle</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</template>

<script>
export default {
  name: "todoList",
  props: ["list"],
  methods: {
    selectItem(item) {
      this.$emit("itemSelected", item)
    },
    isDoneChanged(item) {
      item.isDone = !item.isDone
      this.list.isDone = this.list.items.every(item => {
        return item.isDone
      })
    }
  },
  created() {
    this.list.isDone = this.list.items.every(item => {
        return item.isDone
      })
  }
};
</script>
