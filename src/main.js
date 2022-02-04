import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './css/index.css';

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
