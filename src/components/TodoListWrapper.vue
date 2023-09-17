<script setup lang="ts">
import TodoList from "@/components/TodoList.vue"
import { useTodoStore } from "@/stores/todos"
import { computed, ref } from "vue"

const todo = ref("")
let isHidden = ref(false)

function changeIsHidden() {
  isHidden.value = !isHidden.value
}

const { addTodo, todos } = useTodoStore()

const handleAddTodo = () => {
  addTodo({
    text: todo.value,
    done: false
  })
  todo.value = ""
}

const filteredTodos = computed(() => {
  return isHidden.value ? todos.filter((todo) => !todo.done) : todos
})
</script>

<template>
  <div class="w-1/2 h-1/2 m-auto flex items-center justify-center flex-col">
    <h1 class="text-4xl text-white text-center mb-11">Create your todos...</h1>

    <div class="flex items-center justify-center flex-col gap-2">
      <input
        class="w-96 h-12 rounded-md px-4"
        type="text"
        v-model="todo"
        placeholder="Enter your todo..."
        @keyup.enter="handleAddTodo"
      />

      <button class="w-96 h-12 rounded-md bg-green-500 text-white font-bold" @click="handleAddTodo">
        Add Todo
      </button>

      <button
        @click="changeIsHidden"
        class="w-96 h-12 rounded-md bg-green-500 text-white font-bold"
      >
        {{ isHidden ? "Show All" : "Hide Completed" }}
      </button>
    </div>

    <TodoList :todos="filteredTodos" />
  </div>
</template>
