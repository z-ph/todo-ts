<script setup lang="ts">
import todoContent from './todo-content.vue'
import checkBtn from './check-btn.vue'
import delBtn from './del-btn.vue'
import { useTodoStore } from '@/stores/todos.ts'
import { storeToRefs } from 'pinia'
const store = useTodoStore()
const { filteredTodos } = storeToRefs(store)
const { deleteTodo, toggleCompleted } = store
</script>
<template>
  <div class="todos">
    <div class="todo" v-for="todo in filteredTodos" :key="todo.id">
      <check-btn :todo="todo" :checked="todo.completed" @click="toggleCompleted(todo)" />
      <todo-content :content="todo.text" :line-through="todo.completed" />
      <del-btn @click="deleteTodo(todo)" />
    </div>
  </div>
</template>
<style scoped>
.todos {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.todo {
  position: relative;
  max-width: 400px;
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 20px;
  /* border-left: none; */
  background-color: #fff;
}
.todo > * {
  display: inline-block;
  vertical-align: bottom;
}
</style>
