// stores/todo.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
export interface todo {
  text: string
  completed: boolean
  id: number
}
export const useTodoStore = defineStore('todos', () => {
  const todos = ref([] as todo[])
  todos.value = JSON.parse(localStorage.getItem('todos') as string) ?? []
  const filtered = ref(false)
  const filteredTodos = computed(() => {
    return filtered.value ? todos.value.filter((todo) => !todo.completed) : todos.value
  })

  function deleteTodo(todo: todo) {
    const index = todos.value.indexOf(todo)
    todos.value.splice(index, 1)
  }
  function toggleCompleted(todo: todo) {
    const index = todos.value.indexOf(todo)
    todos.value[index].completed = !todos.value[index].completed
  }

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }
  watch(
    () => todos.value,
    () => {
      save()
    },
    { deep: true },
  )
  return {
    todos,
    filtered,
    filteredTodos,
    deleteTodo,
    toggleCompleted,
  }
})
