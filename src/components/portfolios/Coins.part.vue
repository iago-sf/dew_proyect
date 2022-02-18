<template>
    <div v-if="coinsInfo[0]" class="flex flex-row justify-center border-b-2 py-5 mx-10 border-red-600">
        <div class="flex flex-col basis-[10%]">Icon</div>
        <div class="flex flex-col basis-[20%]">Crypto</div>
        <div class="flex flex-col basis-[20%]">Profit</div>
        <div class="flex flex-col basis-[20%]">Cuantity</div>
        <div class="flex flex-col basis-[20%]">Value</div>
        <div class="flex flex-col basis-[10%]"></div>
    </div>

    <div v-for="coin in coinsInfo" :key="coin.market_cap_rank" class="flex flex-row border-b-2 border-gray-600 py-5 mx-10 justify-center items-center">
        <div class="flex flex-col basis-[10%]"><img class="w-[32px] m-auto" :src="coin.image.small" /></div>
        <div class="flex flex-col basis-[20%]">{{ coin.name }}</div>
        <div v-if="profit(coin) >= 0" class="flex flex-col basis-[20%] text-green-600">${{ profit(coin).toFixed(2) }}</div>
        <div v-else class="flex flex-col basis-[20%] text-red-600">{{ profit(coin).toFixed(2) }}</div>
        <div class="flex flex-col basis-[20%]">{{ coin.dbInfo.cuantity }}</div>
        <div class="flex flex-col basis-[20%]">${{ (coin.tickers[target(coin)].last * coin.dbInfo.cuantity).toFixed(2) }}</div>
        <div class="flex flex-col basis-[10%]"><button @click="deleteCrypto(coin.dbInfo.id)"><i class="bi bi-trash text-red-600 text-2xl m-auto"></i></button></div>
    </div>
</template>
 
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { storeApiUrl } from '../../store/storeApiUrl';

/*
 * Constants 
 */
const url = storeApiUrl();
const router = useRouter();
const emit = defineEmits(['deleted']);

/*
 * Properties
 */
defineProps({
    coinsInfo: {
        type: Array,
        required: true,    
    }
});

/*
 * Functions 
 */
const profit = coin => {
    return (coin.tickers[target(coin)].last * coin.dbInfo.cuantity) - (coin.dbInfo.addedPrice * coin.dbInfo.cuantity)
};

const deleteCrypto = async id => {
    const { data } = await axios.delete(`${url.getUrl()}/addCrypto/${id}`)
        .catch(err => console.log(err));

    emit('deleted');
};

const target = coin => {
    let i = 0;

    for(let j = 0; j < coin.tickers.length; j++){
        if(coin.tickers[i].target != 'USDT'){
            i = j;
        }
    }

    return i;
};
</script>