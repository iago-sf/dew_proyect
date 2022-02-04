import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './css/index.css';

import firebaseConfig from '../firebase/auth';
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

firebase.initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app');

