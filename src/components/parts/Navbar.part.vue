<template>
    <nav class="i-navbar">
        <div class="flex flex-row basis-1/4">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/">Home</router-link>
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/portfolios">Portfolios</router-link>
        </div>
        <div v-if="session.getLog()" class="flex flex-row basis-1/4 justify-end">
            <button @click="handlePortfolio">
                <i class="bi bi-plus-circle-fill text-red-600 text-4xl"></i>
                <label for="" class="hover:absolute hidden">Create new portfolio</label>
            </button>
            <button @click="handleSignOut" class="basis-1/3 i-button-navbar mx-3">Logout</button>
        </div>
        <div v-else class="flex flex-row basis-1/4 justify-end">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/login">Login</router-link>
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/register">Register</router-link>
        </div>
    </nav>

    <CreatePortfolio v-if="session.getLog()" @toggle="toggle('CreatePortfolio')"/>
</template>
 
<script setup>
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { storeLog } from '../../store/storeLog';
import { storeEmail } from '../../store/storeEmail';
import CreatePortfolio from '../modals/CreatePortfolio.modal.vue';

/*
 * Constants
 */
const session = storeLog();
const mail = storeEmail();
const router = useRouter();

/*
 * Properties
 */
let auth;

/*
 * Functions
 */
const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            router.push('/')
        });
};

const handlePortfolio = () => {
    toggle('CreatePortfolio');
};

const toggle = modal => {
    document.getElementById(modal).classList.toggle('hidden');
};

/*
 * Hooks
 */
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user) { 
            mail.setEmail(user.email);
            session.setLog(true);
            
        } else {
            session.setLog(false);
        }

    });
});

</script>