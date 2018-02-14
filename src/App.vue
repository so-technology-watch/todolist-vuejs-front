<template>
  <v-app>
    <v-navigation-drawer fixed :clipped=true v-model="drawer" app>
      <v-list>
        <todoList :list="todoList" :value="todoList.title" 
        v-for="(todoList, i) in todoLists" :key="i"
        @itemSelected="item => {selectedItem = item }" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left=true>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TodoList</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <todoItemContent :item="selectedItem" v-if="selectedItem != null"/>
            <v-card v-else>
              Welcome
            </v-card>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import todoItemContent from "./components/todoItem-content.vue";
import todoList from "./components/todoList.vue";
import * as restClient from "./restClient"


export default {
  components: {
    todoItemContent,
    todoList
  },
  created() {
    restClient.GetAll()
  },
  data() {
    return {
      currentContent: {compo:"todoItem-content", item:"selectedItem"},
      drawer: true,
      todoLists: [
        {
          title: "Todo1",
          isDone: false,
          isActive: true,
          items: [{ title: "task1", isDone: true }]
        },
        {
          title: "Todo2",
          isActive: false,
          items: [
            { title: "task2", isDone: true },
            { title: "task3", isDone: false }
          ]
        }
      ],
      selectedItem: null
    };
  }
};
</script>
