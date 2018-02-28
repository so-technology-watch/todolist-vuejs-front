<template>
  <v-dialog v-model="active" max-width="500px">
    <v-btn fixed bottom fab dark right color="indigo" slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-form ref="form" id="taskForm">
        <editable class="titleForm" :content="taskTitle" @update="val => title = val" placeholder="Title" />
        <editable class="descriptionForm" :content="taskDescription" @update="val => description = val" placeholder="Description" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" flat @click.native="active = false">Ok</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import editable from "./editable.vue";

export default {
  name: "task-dialog",
  props: ["task"],
  components: {
    editable
  },
  data() {
    return {
      active: false,
      title: "",
      description: ""
    };
  },
  computed: {
    taskDescription: function() {
      return this.task == null ? "" : this.task.description
    },
    taskTitle: function() {
      return this.task == null ? "" : this.task.title
    }
  },
  watch: {
    active: function(val) {
      if (val == false) {
        this.save();
      }
    },
    task: function(val) {
      if (val != null) {
        this.active = true;
        this.title = this.task.title;
        this.description = this.task.description;
      } else {
        this.title = ""
        this.description = ""
      }
    }
  },
  methods: {
    close: function() {
      this.$emit("closed", null);
    },
    save: function() {
      if (this.task != null && this.task.id != null) {
        this.task.title = this.title;
        this.task.description = this.description;
        this.$emit("closed", this.task);
      } else {
        this.$emit("closed", {
          title: this.title,
          description: this.description
        });
      }
      this.active = false;
    }
  }
};
</script>

<style>
#taskForm {
  padding-top: 20px;
}
.titleForm {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.descriptionForm {
  font-size: 16px;
}
</style>
 