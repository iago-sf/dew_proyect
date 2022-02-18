<template>
    <div class="bg-black text-white text-center min-h-screen">
        <Navbar />
        <div class="flex flex-row">
            <Aside />
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Navbar from '../components/parts/Navbar.part.vue';
import Aside from '../components/portfolios/Aside.part.vue';
import Footer from '../components/parts/Footer.part.vue';

</script>
 
<style>
</style>