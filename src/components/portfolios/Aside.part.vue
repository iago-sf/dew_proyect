<template>
    <div class="flex flex-col basis-3/12">
        <router-link 
            v-for="portfolio in portfolios" :key="portfolio.portfolioId" 
            class="text-white" 
            :to="'/portfolios/'+portfolio.portfolioId">
            {{ portfolio.name }}
        </router-link>
    </div>
</template>
 
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { storeApiUrl } from '../../store/storeApiUrl';
import { storeEmail } from '../../store/storeEmail';

const portfolios = ref();
const mail = storeEmail();
const url = storeApiUrl();

onMounted(async ()=> {
    const { data: user } = await axios.post(`${url.getUrl()}/user/login`, { email: mail.getEmail()})
        .catch(err => console.log(err));

    const { data } = await axios.get(`${url.getUrl()}/portfolio/get/${user.userId}`)
        .catch(err => console.log(err));

    portfolios.value = data.portfolios;
});

</script>
 
<style>
</style>