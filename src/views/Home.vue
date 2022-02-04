<script setup>
import Navbar from '../components/Navbar.part.vue';
import Footer from '../components/Footer.part.vue';
import { ref } from 'vue';

const name = 'home';

let msg = ref('w');
let count = ref(0);

function log(){
    msg.value = 'hola'
}

function counter() {
    count.value++;
    console.log(count.value)
}
console.log(count.value)
</script>

<template>
    <Navbar />
        <button @click="log">boton</button>
        <br>
        <button @click="counter">{{ count }}</button>
        <div>
            {{ msg }}
        </div>
    <Footer />
</template>