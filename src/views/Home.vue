<template>
    <div class="bg-black text-white text-center">
        <Navbar @togglePortfolio="handlePortfolio" />
        <div class="text-center p-5">
             <h3 class=" text-3xl">
                Track your crypto investments
            </h3>
            <span v-if="!session.getLog()" class="text-gray-600">
                <router-link to="/login" class="hover:text-red-600 underline underline-offset-1">Login</router-link> 
                to add cryptos into your portfolios
            </span>
        </div>
        <div class="flex flex-row border-b-2 py-5 mx-10 border-red-600 justify-center">
            <div class="lg:w-[5%] w-[7.5%] text-center">Rank</div>
            <div class="lg:w-[5%] w-[7.5%] text-center">Icon</div>
            <div class="lg:w-[5%] w-[7.5%] text-center">Tag</div>
            <div class="lg:w-[20%] w-[30%] text-left pl-2">Name</div>
            <div class="lg:w-[12.5%] w-[15%] text-center">Price</div>
            <div class="lg:w-[12.5%] w-[15%] text-center">24h change</div>
            <div v-if="width >= 1024" class="w-[12.5%] text-center">Volume Traded</div>
            <div v-if="width >= 1024" class="w-[12.5%] text-center">Supply</div>
            <div v-if="session.getLog()" class="lg:w-[15%] w-[17.5%] text-center"></div>
        </div>
        <CryptoDetails v-for="elem in search" :key="elem.market_cap_rank" :width="width" :searchData="elem" @toggle="handleToggle"/>

        <Footer />

        <div id="menu" class="w-full h-full bg-black bg-opacity-80 top-0 fixed sticky-0 hidden">
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
                    <button href="javascript:void(0)" class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-black focus:border-black border-b border-transparent text-center text-black">Cancel</button>
                    <button @click="modalToggle('menu')" class="text-black dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" aria-label="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div id="portfolioModal" class="w-full h-full bg-black bg-opacity-80 top-0 fixed sticky-0 hidden">
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
                    <button href="javascript:void(0)" class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-black focus:border-black border-b border-transparent text-center text-black">Cancel</button>
                    <button @click="modalToggle('portfolioModal')" class="text-black dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" aria-label="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.part.vue';
import Footer from '../components/Footer.part.vue';
import CryptoDetails from '../components/CryptoDetails.part.vue';
import { storeLog } from '../store/storeLog';

let search = ref("");
let cryptoId = ref();
let cryptoName = ref();

const session = storeLog();

onMounted(async () => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .catch(err => {
            console.log(err);
        });

    search.value = data;
});

let width = ref(window.innerWidth);
window.addEventListener('resize', () => {
    width.value = window.innerWidth;
});

const handlePortfolio = () => {

    modalToggle('portfolioModal');
};

const handleToggle = e => {
    cryptoId.value = `http://localhost/addCrypto/${e.cryptoId}`;
    cryptoName.value = e.cryptoName;
    modalToggle('menu');
};

const modalToggle = modal => {
    document.getElementById(modal).classList.toggle("hidden");
};

</script>