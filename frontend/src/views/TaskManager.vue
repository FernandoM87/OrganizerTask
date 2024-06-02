<template>
    <h1 class="text-2xl text-center font-bold my-8">Tasks</h1>
  <div>
    <ul class="">
      <li v-for="task in tasks" :key="task.id" class="mb-4">
        <div class="flex items-center justify-between mx-16">
          <span :class="{ 'line-through': task.completed }" contenteditable="true"
            @keydown.enter.prevent="updateTaskTitle($event, task)">
            {{ task.title }}
          </span>
          <div>
            <button @click="removeTask(task.id)"
              class="border-2 border-blue-800 px-3 py-1 rounded-md mr-2">Delete</button>
            <button @click="toggleTaskCompletion(task)" class="border-2 border-blue-800 px-3 py-1 rounded-md">{{
              task.completed ? 'Incomplete' : 'Complete' }}</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="flex justify-center mt-4">
      <input v-model="newTaskTitle" class="border border-gray-400 px-3 py-2 rounded-md mr-2" placeholder="New Task">
      <button @click="addTask" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Task</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const GET_TASKS = gql`
  query GetTasks{
    tasks{
      id
      title
      completed
    }
  }
`;
const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
    }
  }
`;
const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String!, $completed: Boolean!) {
    updateTask(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
const TOGGLE_TASK_COMPLETION = gql`
  mutation ToggleTaskCompletion($id: Int!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;
export default defineComponent({
  setup() {
    const newTaskTitle = ref('');
    const { result, refetch } = useQuery(GET_TASKS);
    const tasks = computed(() => result.value?.tasks ?? []);
    const { mutate: createTask } = useMutation(CREATE_TASK);
    const { mutate: deleteTask } = useMutation(DELETE_TASK);
    const { mutate: ToggleTaskCompletion } = useMutation(TOGGLE_TASK_COMPLETION);
    const { mutate: updateTask } = useMutation(UPDATE_TASK);

    const addTask = async () => {
      await createTask({ title: newTaskTitle.value });
      newTaskTitle.value = '';
      await refetch();

    };

    const removeTask = async (id: number) => {
      await deleteTask({ id });
      await refetch();
    };

    const toggleTaskCompletion = async (task: { id: number; completed: boolean }) => {
      await ToggleTaskCompletion({ id: task.id, completed: !task.completed });
      await refetch();
    };

    const updateTaskTitle = async (event: KeyboardEvent, task: { id: number; title: string }) => {
      if (event.key === 'Enter') {
        const updatedTask = { ...task, title: (event.target as HTMLSpanElement).innerText, completed: false };
        console.log("Updating task:", updatedTask);
        await updateTask(updatedTask);
        await refetch();
      }
    };

    return {
      tasks,
      newTaskTitle,
      addTask,
      removeTask,
      toggleTaskCompletion,
      updateTaskTitle,
    };
  },
});
</script>
