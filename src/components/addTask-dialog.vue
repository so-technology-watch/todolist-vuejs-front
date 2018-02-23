<template>
  <v-dialog v-model="active" max-width="500px">
    <v-btn fixed bottom fab dark right color="indigo" slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-form v-model="valid" ref="form" lazy-validation>
      <v-card-title>
        <v-text-field class="titleForm" label="Title" v-model="title" :rules="[v => !!v || 'Title is required']"/>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Description" v-model="description" multi-line/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" flat @click.native="close">Close</v-btn>
        <v-btn color="blue" flat @click.native="save" :disabled="!valid">Save</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addTask-dialog",
  data() {
    return {
      valid: true,
      active: false,
      title: "",
      description: ""
    };
  },
  methods: {
    close: function() {
      this.$emit("closed", null);
      this.clear();
      this.active = false;
    },
    save: function() {
      if (this.$refs.form.validate()) {
        this.$emit("closed", {
          title: this.title,
          description: this.description
        });
        this.clear();
        this.active = false;
      }
    },
    clear: function() {
      this.title = "";
      this.description = "";
    }
  }
};
</script>

<style>
.titleForm {
  font-size: 20;
  font-weight: bold;
}
</style>
