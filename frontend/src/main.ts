import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { DefaultApolloClient } from '@vue/apollo-composable';
import  apolloClient  from './apollo';
import './assets/index.css';

const app = createApp(App);
app.use(router);
app.provide(DefaultApolloClient, apolloClient);
app.mount('#app');
