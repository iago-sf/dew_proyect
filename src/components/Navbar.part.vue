<template>
    <nav class="i-navbar">
        <div class="flex flex-row basis-1/4">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/">Home</router-link>
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/about">Acerca de</router-link>
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
</template>
 
<script setup>
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { storeLog } from '../store/storeLog';

const session = storeLog();
const router = useRouter();

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user) {
            session.setLog(true);
        } else {
            session.setLog(false);
        }

    });
});

const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            router.push('/')
        });
};

const emit = defineEmits(['togglePortfolio']);
const handlePortfolio = () => {
    emit('togglePortfolio');
};
</script>
 
<style>
</style>