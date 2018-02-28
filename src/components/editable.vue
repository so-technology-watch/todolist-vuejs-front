<template>
  <div contenteditable="true" @input="update" :placeholder="placeholder" ></div>
</template>

<script>
export default {
  name: "editable",
  props: ["content", "placeholder"],
  mounted: this.setContent,
  watch: {
    content: function(val) {
      this.$el.innerText = val;
    }
  },
  methods: {
    update: function (event) {
      this.$emit('update:content', event.target.innerText);
    },
    setContent: function () {
      this.$el.innerText = this.content;
  },
  }
};
</script>

<style>

div[contenteditable=true] {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  outline-color: white;
}

[contenteditable=true]:empty:before{
  content: attr(placeholder);
  display: block; /* For Firefox */
}
</style>
