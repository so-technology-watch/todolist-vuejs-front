<template>
  <v-flex xs3 @mouseover="isHover = true" @mouseout="isHover = false" :value="item.title">
    <v-card tile>
      <v-card-title primary class="title">{{item.title}}</v-card-title>
      <v-card-text>{{item.description}}</v-card-text>
      <v-card-actions v-if="isHover">
        <v-btn fab flat :color="item.status == 1 ? 'green' : ''" @click="checkItem()">
          <v-icon>check_circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "todoItem-card",
  props: ["item"],
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
