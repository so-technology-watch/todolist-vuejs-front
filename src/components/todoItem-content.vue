<template>
  <v-card>
  <h1>{{item.title}}</h1>
  {{item}}
  </v-card>
</template>

<script>
export default {
  name: 'todoItem-content',
  props: ['item']
}
</script>
