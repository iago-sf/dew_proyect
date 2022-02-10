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
        <CryptoDetails v-for="elem in search" :key="elem.market_cap_rank" :width="width" :searchData="elem" @toggle="handleAddToPortfolio"/>

        <Footer />

        <CreatePortfolio v-if="session.getLog()" @toggle="toggle('CreatePortfolio')"/>
        <AddToPortfolio  v-if="session.getLog()" @toggle="toggle('AddToPortfolio')" :cryptoId="cryptoId" :cryptoName="cryptoName"/>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { storeLog } from '../store/storeLog';

import Navbar from '../components/parts/Navbar.part.vue';
import Footer from '../components/parts/Footer.part.vue';
import CryptoDetails from '../components/home/CryptoDetails.part.vue';
import CreatePortfolio from '../components/modals/CreatePortfolio.modal.vue';
import AddToPortfolio from '../components/modals/AddToPortfolio.modal.vue';

let search = ref("");
let cryptoId = ref("");
let cryptoName = ref("");

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
    toggle('CreatePortfolio');
};

const handleAddToPortfolio = e => {
    cryptoId.value = `http://localhost:3001/addCrypto/${e.cryptoId}`;
    cryptoName.value = e.cryptoName;
    toggle('AddToPortfolio');
};

const toggle = modal => {
    document.getElementById(modal).classList.toggle('hidden');
};

</script>