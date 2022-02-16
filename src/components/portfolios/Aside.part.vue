<template>
    <div id="aside" class="flex flex-col basis-3/12 xl:basis-2/12 duration-200 min-h-[85vh]">
        <div class="flex flex-row justify-center items-center min-h-full">
            <div class="flex flex-col w-full">
                <router-link 
                v-for="portfolio in portfolios" :key="portfolio.portfolioId" 
                class="p-5 border-b-2 border-gray-600 hover:border-red-600 hover:text-red-600 hover:scale-105 duration-100" 
                :to="'/portfolios/'+portfolio.portfolioId">
                    {{ portfolio.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>
 
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { storeApiUrl } from '../../store/storeApiUrl';
import { storeEmail } from '../../store/storeEmail';

/*
 * Constants 
 */
const portfolios = ref();
const mail = storeEmail();
const url = storeApiUrl();
const route = useRoute();

/*
 * Functions 
 */
const search = async () => {
    const { data: user } = await axios.post(`${url.getUrl()}/user/login`, { email: mail.getEmail()})
        .catch(err => console.log(err));

    const { data } = await axios.get(`${url.getUrl()}/portfolio/get/${user.userId}`)
        .catch(err => console.log(err));

    portfolios.value = data.portfolios;
};

/*
 * Hooks 
 */
onMounted(async ()=> {
    await search();
});

onBeforeRouteUpdate(async (to, from) => {
    if(!to.params.id){
        await search();
    }
});

</script>