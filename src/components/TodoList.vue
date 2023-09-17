<template>
  <div
    v-if="todos && todos.length > 0"
    class="flex flex-col gap-2 items-center justify-center mt-6"
  >
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <div class="flex gap-2 items-center justify-center">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="todo.done" @change="saveToLocalStorage" />
            <span :class="{ 'line-through': todo.done }">{{ todo.text }}</span>
          </label>
          <button @click="removeTodo(todo.id || -1)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore, type Todo } from "@/stores/todos"

const { removeTodo, saveToLocalStorage } = useTodoStore()

defineProps({
  todos: Array<Todo>
})
</script>
