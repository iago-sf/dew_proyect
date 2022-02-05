import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './css/index.css';

import firebaseConfig from '../firebase/auth';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app');

