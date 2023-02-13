<script setup lang="ts">
import {ref, computed} from 'vue'

interface Todo {
  id: number,
  text: string,
  done: boolean,
}

let id = 0

const todoText = ref('')
const todoList = ref<Todo[]>([])


function addTodo(): void {
  if (!todoText.value) {
    return;
  }
  todoList.value.push({id: id++, text: todoText.value, done: false})
  todoText.value = ''
}

function clearAll(): void {
  todoList.value = [];
}

function clickDone(todo: Todo): void {
  todoList.value = todoList.value.map((elem) => {
    if (elem.id === todo.id) {
      elem.done = !elem.done;
      return elem;
    }
    return elem;
  });
}

function clickRemove(todo: Todo): void {
  todoList.value = todoList.value.filter((t) => t !== todo)
}

const todoCount = computed(() => {
  return todoList.value.reduce((acc, curr) => {
    if (!curr.done) {
      acc++;
    }
    return acc;
  }, 0);
})
</script>

<!--Wydzielic komponenty-->
<template>
  <header>
    <form class="todoform" @submit.prevent="addTodo">
      <input class="todoform__input" v-model="todoText">
      <input type="submit" class="todoform__submit" value="Add Todo"/>
    </form>
  </header>

  <main>
    <section class="todos">
      <div class="todos__header">
        <h2 class="todos__header--smaller">
          {{ todoCount }} Tasks
        </h2>
        <input type="submit" id="clear-all" value="Clear All" @click="clearAll"/>
      </div>
      <div class="list" v-for="todo in todoList" :key="todo.id">
        <div v-bind:class="[!todo.done ? 'task__item' : 'task__item actions__check--done']" class="task__item">
          <div class="list__item">
            <div class="list__item--text">
              {{ todo.text }}
            </div>
          </div>
          <div class="item__actions">
            <button class="actions__check" @click="clickDone(todo)">Done</button>
            <button class="actions__remove" @click="clickRemove(todo)">Remove</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

.todos__header {
  display: flex;
  justify-content: space-between;
}


#clear-all {
  display: inline;
  color: #e1dfdf;
  font-size: 1.25rem;
  cursor: pointer;
  margin-bottom: -1.5rem;
}

.item__actions button:hover, .todoform__submit:hover, #clear-all:hover {
  opacity: 0.7;
}

.todoform {
  display: flex;
  justify-content: space-between;
  background-color: #15151e;
  padding: 1rem;
  border-radius: 1rem;
}

input, button {
  appearance: none;
  border: none;
  outline: none;
  background: none;
}


.todoform__input {
  flex: 1;
  padding: 1rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: #15151e;
  color: #e1dfdf;
  font-size: 1.25rem;
}

.todoform__submit {
  color: #e1dfdf;
  font-size: 1.25rem;
  cursor: pointer;
}

main {
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.todos {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.task__item {
  display: flex;
  justify-content: space-between;
  background-color: #15151e;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.list__item--text {
  color: #e1dfdf;
  font-size: 1.25rem;
  width: 100%;
}

.item__actions {
  display: flex;
  margin-right: -0.5rem;
}

.item__actions button {
  cursor: pointer;
  margin: 0 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #e1dfdf;
}

.actions__check--done {
  opacity: 0.5;
}

header {
  padding: 2rem 1rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.todoform--big {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-left: 1rem;
  text-align: center;
}


.todos__header--smaller {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-right: 5rem;
  display: inline-block;
}

</style>
