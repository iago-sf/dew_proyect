import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Portfolios from '../views/Portfolios.vue';
import Content from '../components/portfolios/Content.part.vue';

const routes = [
    { path: "/", component: Home },
    { path: "/about", component: About, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/portfolios", component: Portfolios, meta: { requiresAuth: true }, children: [{ path: ":id", component: Content }] },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
}

router.beforeEach(async (to, from, next)=>{
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(await getCurrentUser()) {
            next();
        
        } else {
            next('/login');
        }
      
    } else {
        next();
    }
});

export default router;
