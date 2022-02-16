<template>
    <div id="AddToPortfolio" class="w-full h-full bg-black bg-opacity-80 top-0 fixed sticky-0 hidden">
        <div class="2xl:container 2xl:mx-auto py-24 px-4 md:px-28 flex justify-center items-center">
            <div class="w-96 md:w-auto dark:bg-black relative flex flex-col justify-center items-center border-2 border-red-600 bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36 rounded-md">
                <div class="mt-12">
                    <h1 role="main" class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-black">Select in which portfolio you want to add {{ cryptoName }}</h1>
                </div>
                <div class="mt-5 w-[50%]">
                    <select @click="search()" v-model="portfolio" name="portfolio" class="leading-none bg-gray-200 border rounded text-xs font-medium text-black py-3 w-full pl-3 mt-2 focus:scale-105 duration-100">
                        <option value="-1" disabled>Select your prefered portfolio</option>
                        <option v-for="portfolio in portfolios" :key="portfolio.portfolioId" :value="portfolio.portfolioId" class="">{{ portfolio.name }}</option>
                    </select>
                </div>
                <div class="mt-5 w-[50%]">
                    <label id="price" class="text-sm font-medium leading-none text-red-600">
                        Buying price
                    </label>
                    <input aria-labelledby="price" type="number" class="i-input" placeholder="2.54" v-model.trim="price"/>
                </div>
                <div class="mt-5 w-[50%]">
                    <label id="cuantity" class="text-sm font-medium leading-none text-red-600">
                        Cuantity
                    </label>
                    <input aria-labelledby="cuantity" type="number" class="i-input" placeholder="20.6" v-model.trim="cuantity"/>
                </div>
                <button @click="addCrypto(cryptoId)" class="mt-5 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 text-sm font-semibold leading-none text-white focus:outline-none bg-red-600 border rounded hover:bg-red-700 py-4 w-[50%]">Confirm</button>
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
import { onMounted, ref, watch } from 'vue';
import { storeApiUrl } from '../../store/storeApiUrl';
import { storeEmail } from '../../store/storeEmail';

/*
 * Constants 
 */
const emit = defineEmits(['toggle']);
const mail = storeEmail();
const url = storeApiUrl();

/*
 * Properties 
 */
const portfolio = ref('-1');
const price = ref();
const cuantity = ref();
const portfolios = ref();

const props = defineProps({
    cryptoName: {
        type: String,
        required: true,
    },
    cryptoId: {
        type: String,
        required: true,
    }
});

/*
 * Functions 
 */
const modalToggle = () => {
    modalReset();
};

const addCrypto = async id => {
    const { data } = await axios.post(`${url.getUrl()}/addCrypto`, { 
            coin: id,
            cuantity: cuantity.value,
            addedPrice: price.value,
            portfolioId: portfolio.value,
        })
        .catch(err => console.log(err));
    
    modalReset();
};

const modalReset = ()=> {
    portfolio.value = -1;
    price.value = '';
    cuantity.value = '';
    emit('toggle');
};

const search = async () => {
    const { data: user } = await axios.post(`${url.getUrl()}/user/login`, { email: mail.getEmail()})
        .catch(err => console.log(err));
    
    const { data } = await axios.get(`${url.getUrl()}/portfolio/get/${user.userId}`)
        .catch(err => console.log(err));

    portfolios.value = data.portfolios;
};
</script>