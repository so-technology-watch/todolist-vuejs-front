<template>
  <v-app>
    <v-navigation-drawer fixed :clipped=true v-model="drawer" app>
      <v-list>
        <todoItem :task="todoItem" :value="todoItem.title" v-for="(todoItem, i) in todoItems" :key="i" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left=true>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TodoList</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
          <v-layout row wrap>
            <todoItemCard :item="todoItem" 
                          v-for="(todoItem, i) in todoItems" :key="i"
                          @itemChecked="checkItem"/>
            <!-- <v-card>
              Welcome
            </v-card> -->
            <v-btn fixed absolute bottom fab dark right @click.native="addTask()" color="indigo" >
              <v-icon>add</v-icon>
            </v-btn>
          </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import todoItemCard from "./components/todoItem-card.vue";
import todoItem from "./components/todoItem.vue";
import * as restClient from "./restClient";

export default {
  components: {
    todoItemCard,
    todoItem
  },
  created() {
    this.refreshTasks()
    // restClient.DeleteAll(todo => this.todoItems = todo);
    // restClient.DeleteAll(console.log)
  },
  data() {
    return {
      currentContent: { compo: "todoItem-content", item: "selectedItem" },
      drawer: true,
      todoItems: [],
      selectedItem: null
    };
  },
  methods: {
    addTask() {
      restClient.Create({
        title:"newTask",
        description: "new Description"
      }, this.refreshTasks)
    },
    refreshTasks() {
      restClient.GetAll(todo => (this.todoItems = todo));
    },
    checkItem(item) {
      item.status = (item.status + 1) % 2
    }
  }
};
</script>
