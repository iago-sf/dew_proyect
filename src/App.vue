<template>
  <div class="bg-black h-screen">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.part.vue';
import Footer from './components/Footer.part.vue';
</script>

<style>
</style>
