<template>
    <div id="AddToPortfolio" class="w-full h-full bg-black bg-opacity-80 top-0 fixed sticky-0 hidden">
        <div class="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div class="w-96 md:w-auto dark:bg-black relative flex flex-col justify-center items-center border-2 border-red-600 bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                <div class="mt-12">
                    <h1 role="main" class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-black">Select in which portfolio you want to add {{ cryptoName }}</h1>
                </div>
                <div class="mt-5 text-center ">
                    <select v-model="portfolio" name="portfolio" class="text-black bg-gray-200 border rounded font-medium leading-none py-2 w-full pl-3 focus:scale-105 duration-100">
                        <option value="" disabled default>Select your prefered portfolio</option>
                        <option value="algo" class="">algo</option>
                    </select>
                </div>
                <a :href="cryptoId" class="w-full dark:text-black dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-10 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black bg-black hover:bg-black">Confirm</a>
                <button @click="modalToggle()" class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-black focus:border-black border-b border-transparent text-center text-black">Cancel</button>
                <button @click="modalToggle()" class="text-black dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" aria-label="close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
 
<script setup>
import axios from 'axios';
import { onUpdated, ref } from 'vue';
import { storeApiUrl } from '../../store/storeApiUrl';
import { storeEmail } from '../../store/storeEmail';

const portfolio = ref();

defineProps({
    cryptoName: {
        type: String,
        required: true,
    },
    cryptoId: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['toggle']);
const modalToggle = () => {
    emit('toggle');
};

const mail = storeEmail();
const url = storeApiUrl();

onUpdated(async ()=> {
    const { data: user } = await axios.post(`${url.getUrl()}/user/login`, { email: mail.getEmail()})
        .catch(err => console.log(err));
    
    const res = await axios.get(`${url.getUrl()}/portfolio/get/${user.userId}`);
    console.log(res);
});
</script>
 
<style>
</style>