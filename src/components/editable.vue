<template>
  <div contenteditable="true" @input="update" :placeholder="placeholder"></div>
</template>

<script>
export default {
  name: "editable",
  props: ["content", "placeholder"],
  watch: {
    content: function(val) {
      this.$el.innerText = val;
    }
  },
  methods: {
    update: function(event) {
      this.$emit("update", event.target.innerText);
    }
  }
};
</script>

<style>
div[contenteditable="true"] {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  outline-color: white;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
}
</style>
