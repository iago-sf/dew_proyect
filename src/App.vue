<template>
  <nav>
      <router-link to="/">Home</router-link>&nbsp;
      <router-link to="/about">Acerca de</router-link>
  </nav>
  <h1>{{ name }}</h1>
  <button @click="changeName">click</button>
  <router-view />
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Manu');

function changeName() {
  name.value = 'iago';
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
