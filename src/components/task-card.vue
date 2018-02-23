<template>
  <v-flex xs3 @mouseover="isHover = true" @mouseout="isHover = false" :value="task.title">
    <v-card tile>
      <v-card-title primary class="title">{{task.title}}</v-card-title>
      <v-card-text>{{task.description}}</v-card-text>
      <v-card-actions v-if="isHover">
        <v-btn fab flat :color="task.status == 1 ? 'green' : ''">
          <v-icon>check_circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "task-card",
  props: ["task"],
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    checkItem() {
      this.$emit("itemChecked", this.item);
    }
  }
};
</script>

<style>
.title {
  font-size: 20;
  font-weight: bold;
}
</style>
