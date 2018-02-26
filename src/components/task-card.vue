<template>
  <v-flex xs3 @mouseover="isHover = true" @mouseout="isHover = false" :value="task.title">
    <v-card tile>
      <v-card-title primary class="title">{{task.title}}</v-card-title>
      <v-card-text>{{task.description}}</v-card-text>
      <v-card-actions>
        <v-btn flat small fab @click="edit">
          <v-icon v-if="isHover" :color="task.status == 1 ? 'green' : ''">edit</v-icon>
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
      this.$emit("itemChecked", this.task);
    },
    edit() {
      this.$emit("taskEdit", this.task)
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
