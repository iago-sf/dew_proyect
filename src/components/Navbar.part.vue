<template>
    <nav class="i-navbar">
        <div class="flex flex-row basis-1/4">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/">Home</router-link>
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/about">Acerca de</router-link>
        </div>
        <div v-if="sesion" class="flex flex-row basis-1/4 justify-end">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/logout">Logout</router-link>
        </div>
        <div v-else class="flex flex-row basis-1/4 justify-end">
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/login">Login</router-link>
            <router-link class="basis-1/3 i-button-navbar mx-3" to="/register">Register</router-link>
        </div>
    </nav>
</template>
 
<script setup>

</script>
 
<style>
</style>