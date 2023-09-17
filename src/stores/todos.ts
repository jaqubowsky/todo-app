import { defineStore } from "pinia"
import { ref } from "vue"

export type Todo = {
  id: number
  text: string
  done: boolean
}

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem("todos") || "[]") as Todo[])
  let nextValue = todos.value.length + 1

  function addTodo({ text, done = false }: { text: string; done: boolean }): void {
    if (!text) {
      return alert("Text is required")
    }

    todos.value.push({
      id: nextValue++,
      text: text || "",
      done
    })

    console.log(todos.value)
    saveToLocalStorage()
  }

  function removeTodo(id: Todo["id"]): void {
    const index = todos.value.findIndex((todo) => todo.id === id)

    todos.value.splice(index, 1)

    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos.value))
  }

  return { todos, addTodo, removeTodo, saveToLocalStorage }
})
