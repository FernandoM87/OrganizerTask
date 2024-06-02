import { createRouter, createWebHistory } from 'vue-router';
import TaskManager from '../views/TaskManager.vue';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/task', component: TaskManager }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
